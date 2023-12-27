import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { drawLine } from "../D3/drawPack/utils/drawLine";
import { drawRoundedRect } from "../D3/drawPack/utils/drawCandle";
import { drawXAxis } from "../D3/drawPack/workers/XScaleTime/drawXAxis";
import { drawYAxis } from "../D3/drawPack/workers/YScale/drawYAxis";
import { drawCurrent } from "../D3/drawPack/workers/CurrentPrice/drawCurrent";
import { CandleX } from "../../../reduxStorage/candles/candleType";
import { getPointOnCurve } from "../D3/drawPack/utils/getPoinOnCurve";

export type DataForRender = {
    context: CanvasRenderingContext2D,
    customBase: React.MutableRefObject<HTMLElement | null>,
    x: d3.ScaleTime<number, number, never>,
    y: number[] & d3.ScaleLinear<number, number, never>,
    candle_width: number,
    chart_dimentions: {
        height: number,
        width: number
    },
    candlesWithXCoord: CandleX[],
    points: {x: number, y: number}[]
}

const RenderLoop = ({context, customBase, x, y, chart_dimentions, candlesWithXCoord, candle_width, points}: DataForRender) => {

    const image = useRef(new Image());
    image.current.src = "/img/moon.png";

    useEffect(() => {
        const custom = d3.select(customBase.current);
        let req : number = 0;

        const renderLoop = () => {
            context.clearRect(0, 0, chart_dimentions.width, chart_dimentions.height)
            
            drawXAxis(context, x, chart_dimentions.height, candle_width);
            drawYAxis(context, y, chart_dimentions.height, chart_dimentions.width);
            drawCurrent(context, y(candlesWithXCoord[candlesWithXCoord.length - 1].currentPrice), candlesWithXCoord[candlesWithXCoord.length - 1].currentPrice, chart_dimentions.width, 2);
            
            const lines = custom.selectAll('custom.line')
            lines.each(function(d, i) {
                const node = d3.select(this);
                const x1 = parseInt(node.attr('x1'));
                const x2 = parseInt(node.attr('x2'));
                const y1 = parseInt(node.attr('y1'));
                const y2 = parseInt(node.attr('y2'));
                drawLine(x1, y1, x2, y2, node.attr('strokeFill'), 1, context)
            })
        
            const rects = custom.selectAll('custom.rect')
        
            rects.each(function(d, i) {
                const node = d3.select(this);
                const x = parseInt(node.attr('x'));
                const y = parseInt(node.attr('y'));
                const width = parseInt(node.attr('width'));
                const height = parseInt(node.attr('height'));
                drawRoundedRect(x, y, width, height, 2, context, node.attr('strokeFill'), node.attr('fillStyle'));
            })
            req = requestAnimationFrame(renderLoop);

            const t = (Date.now() % 100000) / 100000; 
            const pointOnCurve = getPointOnCurve(points, t);
            context.save();
            context.translate(pointOnCurve.x, pointOnCurve.y - 16.5);
            context.rotate(t * 10 * Math.PI);
            context.drawImage(image.current, -16.5, -16.5, 33, 33);
            context.translate(-pointOnCurve.x,  -pointOnCurve.y + 16.5);
            context.restore();
        };
    
        renderLoop();
    
        return () => {
            cancelAnimationFrame(req);
        };
      }, [context, customBase.current, x, y, chart_dimentions, candlesWithXCoord, candle_width, points]);

    return (
        <></>
    )
}

export default RenderLoop;
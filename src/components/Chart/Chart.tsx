import { useEffect, useRef } from "react";
import * as d3 from "d3";
import candlesData from "./data.json";
import { countXData } from "./dataHook";
import candles from "../../reduxStorage/candles/candles";
import { getXVisibleRangeWithPadding } from "./D3/drawPack/utils/getXVisibleRangeWithPadding";
import { getVisibleCandles } from "./D3/drawPack/utils/getVisibleCandles";
import { getYScale } from "./D3/drawPack/workers/YScale/getYScale";
import { drawRoundedRect } from "./D3/drawPack/utils/drawCandle";
import { drawLine } from "./D3/drawPack/utils/drawLine";

const Chart = () => {
    
    const d3Container = useRef(null);
    const canvasRef  = useRef(null);

    useEffect(() => {
        const canvas = d3.select(d3Container.current)
            .append('canvas')
            .attr('width', 500)
            .attr('height', 300);

        const context = canvas?.node()?.getContext('2d');

        if(!context) {
            return;
        }
        
        const customBase = document.createElement('custom');
        const custom = d3.select(customBase);
        const {candle_width, candle_width_with_gap, candlesWithXCoord, x, xAxis} = countXData(candlesData.pair, 300);

        //counts visible range + padding from current transform
        const xRange = getXVisibleRangeWithPadding(0, 500, 50);

        //left candles, which x coordinate is in xRange
        let visCandles = getVisibleCandles(candlesWithXCoord, xRange, 0)

        //if nothing is visible, do nothing
        if(visCandles.length === 0) {
            visCandles = candlesWithXCoord.slice(candlesWithXCoord.length - 7)
        }

        //gets current yScale for visible interval of candles
        const y = getYScale(visCandles, 300, [0, 0])

        const rectsInput = custom.selectAll('custom.rect')
            .data(candlesWithXCoord)

        rectsInput
            .enter()
            .append('custom')
            .attr('class', 'rect')
            .attr('x', function(d) {
                return d.x;
            })
            .attr('y', d => d.enterPrice > d.currentPrice? y(d.enterPrice) : y(d.currentPrice))
            .attr('fillStyle', d => d.enterPrice > d.currentPrice ? '#2d2f31': '#C6C6CA')
            .attr('strokeFill', '#C6C6CA')
            .attr('width', candle_width)
            .attr('height', d => {
                return Math.abs(y(d.enterPrice) - y(d.currentPrice))
            })

        const linesInput = custom.selectAll('custom.line')
            .data(candlesWithXCoord)

        linesInput
            .enter()
            .append('custom')
            .attr('class', 'line')
            .attr('x1', d => d.x + candle_width/2)
            .attr('x2', d => d.x + candle_width/2)
            .attr('y1', d => {
                console.log(y(d.high))
                return y(d.high)
            })
            .attr('y2', d => y(d.low))
            .attr('strokeFill', '#C6C6CA')

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

        

    }, [d3Container, canvasRef])


    return ( 
        <div ref={d3Container}>
        </div>
        
    )
}

export default Chart;
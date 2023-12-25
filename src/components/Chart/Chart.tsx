import { useEffect, useRef } from "react";
import * as d3 from "d3";
import candlesData from "./data.json";
import { countXData } from "./dataHook";
import { getXVisibleRangeWithPadding } from "./D3/drawPack/utils/getXVisibleRangeWithPadding";
import { getVisibleCandles } from "./D3/drawPack/utils/getVisibleCandles";
import { getYScale } from "./D3/drawPack/workers/YScale/getYScale";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../../reduxStorage/configureStore";
import { setHistory, setXData } from "../../reduxStorage/candles/candles";
import { draw } from "./D3/draw";

const chart_dimentions = {
    width: 1500,
    height: 500
}

const deafault_candles_amount_on_screen = chart_dimentions.width / 15;
let zoom = 1;
const gap = 5;

const Chart = () => {
    
    const d3Container = useRef(null);
    const canvasRef  = useRef<d3.Selection<HTMLCanvasElement, unknown, null, undefined> | null>(null);
    const candles = useSelector((storage: RootReducer) => storage.candles);
    const dispatch = useDispatch();
    const customBase = useRef<null | HTMLElement>(null);

    useEffect(() => {
        dispatch(setHistory(candlesData.pair));
        canvasRef.current = d3.select(d3Container.current)
            .append('canvas')
            .attr('width', chart_dimentions.width)
            .attr('height', chart_dimentions.height);
    }, [])

    useEffect(() => {
        const lastMessage = candles.lastMessage;
        if(candles.history === null) return;
        dispatch(setXData(countXData(candles.history, chart_dimentions.height, chart_dimentions.width, deafault_candles_amount_on_screen / zoom, gap)));
        if(lastMessage !== null && candles !== null) {
            if(d3Container.current !== null) {
                try {
                    const newCandle = lastMessage;
                    console.log(newCandle)
                    if("symbol" in newCandle) {
                        let newData = [...candles.history];
                        if(newCandle.candleId === newData[newData.length - 1].candleId) {
                            const newCandleModified = {...newCandle, isnew: false };
                            newData[newData.length - 1] = newCandleModified;
                        } else {
                            const newCandleModified = {...newCandle, isnew: true };
                            newData.shift();
                            newData.push(newCandleModified);
                        }
                        dispatch(setHistory(newData));
                        dispatch(setXData(countXData(candles.history, chart_dimentions.height, chart_dimentions.width, deafault_candles_amount_on_screen / zoom, gap)))
                    }
                } catch(e) {
                    console.log(e);
                }
            }
            
        }
    }, [candles.lastMessage, d3Container.current]);

    useEffect(() => {
        const context = canvasRef.current?.node()?.getContext('2d');

        if(!context || candles.history === null) {
            return;
        }
        
        if(customBase.current === null) {
            customBase.current = document.createElement('custom');
        }

        const custom = d3.select(customBase.current);
        const {candle_width, candle_width_with_gap, candlesWithXCoord, x, xAxis} = countXData(candles.history, chart_dimentions.height, chart_dimentions.width, deafault_candles_amount_on_screen / zoom, gap);

        //counts visible range + padding from current transform
        const xRange = getXVisibleRangeWithPadding(0, 1000, 50);

        //left candles, which x coordinate is in xRange
        let visCandles = getVisibleCandles(candlesWithXCoord, xRange, 0)

        //if nothing is visible, do nothing
        if(visCandles.length === 0) {
            visCandles = candlesWithXCoord.slice(candlesWithXCoord.length - 7)
        }

        //gets current yScale for visible interval of candles
        const y = getYScale(visCandles, 300, [0, 0])

        

        const image = new Image();
        image.src = "/img/moon.png";

        const points_for_moon_path_top = candlesWithXCoord.map((d, inx) => {
            return { 
                x: d.x + candle_width/2 ,
                y: y(d.high) 
            }
        })
        const points_for_moon_path_left_corner = candlesWithXCoord.map((d, inx) => {
            return { 
                x: d.x ,
                y: d.enterPrice > d.currentPrice ? y(d.enterPrice) : y(d.currentPrice) 
            }
        })
        const points_for_moon_path_right_corver = candlesWithXCoord.map((d, inx) => {
            return { 
                x: d.x + candle_width,
                y: d.enterPrice > d.currentPrice ? y(d.enterPrice)  : y(d.currentPrice) 
            }
        })
        const points_for_moon_path = [...points_for_moon_path_top, ...points_for_moon_path_left_corner, ...points_for_moon_path_right_corver];
        points_for_moon_path.sort((a, b) => a.x - b.x);
    
        context.clearRect(0, 0, chart_dimentions.width, chart_dimentions.height);

    // Draw the curve through points
    // drawCurveThroughPoints(points, "blue", 2, context);
        draw(custom, context, y, candle_width, candlesWithXCoord);
        // image.onload = function() {
        //     animateImage(context, chart_dimentions.width, chart_dimentions.height, points_for_moon_path, image, custom);
        // };          
        
    }, [candles.xData, d3Container, canvasRef])

    // useEffect(() => {
    //     const context = canvasRef.current?.node()?.getContext('2d');

    //     if(!context || canvasRef.current === null || candles.history === null) {
    //         return;
    //     }
    //     const {candle_width, candle_width_with_gap, candlesWithXCoord, x, xAxis} = countXData(candles.history, chart_dimentions.height, chart_dimentions.width, deafault_candles_amount_on_screen / 1, gap);

    //     const xRange = getXVisibleRangeWithPadding(0, 1000, 50);

    //     //left candles, which x coordinate is in xRange
    //     let visCandles = getVisibleCandles(candlesWithXCoord, xRange, 0)

    //     //if nothing is visible, do nothing
    //     if(visCandles.length === 0) {
    //         visCandles = candlesWithXCoord.slice(candlesWithXCoord.length - 7)
    //     }

    //     //gets current yScale for visible interval of candles
    //     const y = getYScale(visCandles, 300, [0, 0]);

    //     const zoom = d3.zoom()
    //         .on('zoom', (event) => {
    //             const transform = event.transform;
    //             console.log("HERE IS ZOONNNN")
    //             // Clear the canvas
    //             context.clearRect(0, 0, chart_dimentions.width, chart_dimentions.height);

    //             // Apply the zoom transform to the canvas context
    //             context.setTransform(transform.k, 0, 0, transform.k, transform.x, transform.y);
    //             const custom = d3.select(customBase.current)
    //             // Redraw the data on the canvas
    //             draw(custom, context, y, candle_width, candlesWithXCoord);
    //         })

    //     canvasRef.current
    //         .call(zoom as any)
    // }, [])



    return ( 
        <div ref={d3Container}>
        </div>
        
    )
}

export default Chart;
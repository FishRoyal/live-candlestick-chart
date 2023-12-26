import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import candlesData from "./data.json";
import { countXData } from "./dataHook";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../../reduxStorage/configureStore";
import { setHistory, setXData } from "../../reduxStorage/candles/candles";
import { draw } from "./D3/draw";

const chart_dimentions = {
    width: 1500,
    height: 500
}

const deafault_candles_amount_on_screen = chart_dimentions.width / 15;
const gap = 5;

const Chart = () => {
    
    const d3Container = useRef(null);
    const canvasRef  = useRef<d3.Selection<HTMLCanvasElement, unknown, null, undefined> | null>(null);
    const candles = useSelector((storage: RootReducer) => storage.candles);
    const dispatch = useDispatch();
    const customBase = useRef<null | HTMLElement>(null);
    const [zoom, setZoom] = useState(1);
    const [transform, setTransform] = useState(0);

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
        dispatch(setXData(countXData(candles.history, chart_dimentions.height, chart_dimentions.width, deafault_candles_amount_on_screen / zoom, gap, transform)));
        if(lastMessage !== null && candles !== null) {
            if(d3Container.current !== null) {
                try {
                    const newCandle = lastMessage;
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
                        dispatch(setXData(countXData(candles.history, chart_dimentions.height, chart_dimentions.width, deafault_candles_amount_on_screen / zoom, gap, transform)))
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
        
        draw(custom, context, zoom, gap, chart_dimentions, candles, deafault_candles_amount_on_screen, transform);
        

        // const image = new Image();
        // image.src = "/img/moon.png";

        // const points_for_moon_path_top = candlesWithXCoord.map((d, inx) => {
        //     return { 
        //         x: d.x + candle_width/2 ,
        //         y: y(d.high) 
        //     }
        // })
        // const points_for_moon_path_left_corner = candlesWithXCoord.map((d, inx) => {
        //     return { 
        //         x: d.x ,
        //         y: d.enterPrice > d.currentPrice ? y(d.enterPrice) : y(d.currentPrice) 
        //     }
        // })
        // const points_for_moon_path_right_corver = candlesWithXCoord.map((d, inx) => {
        //     return { 
        //         x: d.x + candle_width,
        //         y: d.enterPrice > d.currentPrice ? y(d.enterPrice)  : y(d.currentPrice) 
        //     }
        // })
        // points_for_moon_path.current = [...points_for_moon_path_top, ...points_for_moon_path_left_corner, ...points_for_moon_path_right_corver];
        // points_for_moon_path.current.sort((a, b) => a.x - b.x);

        // animateImage(context, chart_dimentions.width, chart_dimentions.height, {points: points_for_moon_path.current}, image, custom, animationRecursive.current);         
        
    }, [candles.xData, d3Container, canvasRef, zoom])

    useEffect(() => {
        if(canvasRef.current === null) return;
        const zoom = d3.zoom()
            .scaleExtent([0.9, 2])
            .on('zoom', (event) => {
                const transform = event.transform;
                setZoom(transform.k)
            })

        canvasRef.current
            .call(zoom as any)
    }, [canvasRef.current])

    useEffect(() => {
        if(canvasRef.current === null) return;
        const transform = d3.drag()
            .on('drag', (event) => {
                const transform = event.transform;
                setTransform(transform.x)
            })

        canvasRef.current
            .call(transform as any)
    }, [canvasRef.current])



    return ( 
        <div ref={d3Container}>
        </div>
        
    )
}

export default Chart;
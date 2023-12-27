import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootReducer } from "../../reduxStorage/configureStore";
import RenderLoop from "./RenderLoop/RenderLoop";
import useInitial from "./ChartHooks/UseInitial";
import useProcessMessages from "./ChartHooks/UseProcessMessages";
import useCountYScale from "./ChartHooks/UseCountYScale";
import useD3BindDataProcess from "./D3/UseD3BindDataProcess";
import useCountMoonPoints from "../MoonTextGenerator/useCountMoonPoints";

const chart_dimentions = {
    width: window.innerWidth - 300,
    height: window.innerHeight - 400
}

const deafault_candles_amount_on_screen = chart_dimentions.width / 15;
const gap = 5;

const Chart = () => {
    
    const d3Container = useRef(null);
    const candles = useSelector((storage: RootReducer) => storage.candles);
    const customBase = useRef<null | HTMLElement>(null);
    const [zoom, setZoom] = useState(1);
    const transform = useRef(0);

    const canvasRef = useInitial({
        chart_dimentions, 
        d3Container,
        customBase
    });

    const context = canvasRef.current?.node()?.getContext('2d');


    useProcessMessages({
        candles,
        chart_dimentions,
        d3Container,
        deafault_candles_amount_on_screen,
        gap,
        transform,
        zoom
    });

    const y = useCountYScale({
        candlesWithXCoord: candles.xData?.candlesWithXCoord,
        chart_dimentions
    })

    useD3BindDataProcess({
        candlesWithXCoord: candles.xData?.candlesWithXCoord,
        customBase,
        y,
        candle_width: candles.xData?.candle_width
    })

    const points = useCountMoonPoints({
        candlesWithXCoord: candles.xData?.candlesWithXCoord,
        candle_width: candles.xData?.candle_width,
        y
    })

    return ( 
        <>
            <div ref={d3Container}></div>
            {
                context && candles.xData && y && points ?
                <RenderLoop 
                    context={context}
                    candle_width={candles.xData.candle_width}
                    candlesWithXCoord={candles.xData.candlesWithXCoord}
                    chart_dimentions={chart_dimentions}
                    customBase={customBase}
                    x={candles.xData.x}
                    y={y}
                    points={points}
                /> 
                : null
            }
        </>
       
        
    )
}

export default Chart;


    // useEffect(() => {
    //     if(canvasRef.current === null) return;
    //     const context = canvasRef.current?.node()?.getContext('2d');

    //     if(!context || candles.history === null) {
    //         return;
    //     }
    //     const custom = d3.select(customBase.current);
    //     const drag = d3.drag()
    //         .on("drag", function(event) {
    //             transform.current += event.dx;
               
               
    //         })
    //         .on("end", (event) => {
    //             draw(custom, context, zoom, gap, chart_dimentions, candles, deafault_candles_amount_on_screen, transform.current);
    //         })
    //     canvasRef.current
    //         .call(drag as any)
    // }, [canvasRef.current])

    // useEffect(() => {
    //     if(canvasRef.current === null) return;
    //     const zoom = d3.zoom()
    //         .scaleExtent([0.9, 2])
    //         .on('zoom', (event) => {
    //             const transform = event.transform;
    //             setZoom(transform.k)
    //         })

    //     canvasRef.current
    //         .call(zoom as any)
    // }, [canvasRef.current])

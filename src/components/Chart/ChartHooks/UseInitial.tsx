import { useEffect, useRef } from "react"
import { useDispatch } from "react-redux";
import { setHistory } from "../../../reduxStorage/candles/candles";
import candlesData from "./data.json";
import * as d3 from "d3";

const useInitial = ({chart_dimentions, d3Container, customBase}: {
    d3Container: React.MutableRefObject<null>,
    chart_dimentions: {
        height: number,
        width: number
    },
    customBase: React.MutableRefObject<HTMLElement | null>
}) => {

    const dispatch = useDispatch();
    const canvasRef = useRef<d3.Selection<HTMLCanvasElement, unknown, null, undefined> | null>(null);

    useEffect(() => {
        if(customBase.current === null) {
            customBase.current = document.createElement('custom');
        }
        dispatch(setHistory(candlesData.pair));

        canvasRef.current = d3.select(d3Container.current)
            .append('canvas')
            .attr('width', chart_dimentions.width)
            .attr('height', chart_dimentions.height)
            .attr('trm', 23)

    }, []) 

    return canvasRef;
}

export default useInitial;
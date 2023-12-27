import { ScaleLinear } from "d3";
import { useEffect, useRef, useState } from "react";
import { CandleX } from "../../../reduxStorage/candles/candleType";
import { getVisibleCandles } from "../D3/drawPack/utils/getVisibleCandles";
import { getXVisibleRangeWithPadding } from "../D3/drawPack/utils/getXVisibleRangeWithPadding";
import { getYScale } from "../D3/drawPack/workers/YScale/getYScale";

const useCountYScale = ({
    candlesWithXCoord,
    chart_dimentions
}: {
    candlesWithXCoord: CandleX[] | undefined,
    chart_dimentions: {
        width: number,
        height: number
    }
}) => {

    const y = useRef<number[] & ScaleLinear<number, number, never> | null>(null)

    useEffect(() => {
        if(typeof candlesWithXCoord === "undefined") return;

        const xRange = getXVisibleRangeWithPadding(0, chart_dimentions.width, -10);

        //left candles, which x coordinate is in xRange
        let visCandles = getVisibleCandles(candlesWithXCoord, xRange, 0)

        //if nothing is visible, do nothing
        if(visCandles.length === 0) {
            visCandles = candlesWithXCoord.slice(candlesWithXCoord.length - 7)
        }

        //gets current yScale for visible interval of candles
        y.current = getYScale(visCandles, chart_dimentions.height, [20, 20])

    }, [candlesWithXCoord])
    
    return y.current;
}

export default useCountYScale;
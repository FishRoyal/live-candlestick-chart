import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setHistory } from "../../../reduxStorage/candles/candles";
import { CandleData, CandleX } from "../../../reduxStorage/candles/candleType";

const countNewArrayWithPreviousCandles = (baseCandlesCount: number, candlesWithXCoord: CandleX[]): CandleData[] => {
    const newHistoryData = candlesWithXCoord.slice(0, baseCandlesCount).map((candleX: CandleX) => {
        return {
            ...candleX,
            x: undefined,
            startTimestamp: candleX.startTimestamp - 60*baseCandlesCount,
            endTimestamp: candleX.endTimestamp - 60*baseCandlesCount
        }
    })

    const candlesWithoutX = candlesWithXCoord.map((candleX: CandleX) => {
        return {
            ...candleX,
            x: undefined
        }
    })

    newHistoryData[newHistoryData.length - 1].currentPrice = candlesWithoutX[0].enterPrice;
    newHistoryData[newHistoryData.length - 1].exitPrice = candlesWithXCoord[0].enterPrice;
    return [...newHistoryData, ...candlesWithoutX]
}

const useExtendData = ({
    candlesWithXCoord,
    setTransform,
    candle_width,
    gap
}: {
    candlesWithXCoord: CandleX[] | null | undefined,
    setTransform: React.Dispatch<React.SetStateAction<number>>,
    candle_width: number | null | undefined,
    gap: number
}) => {

    const dispatch = useDispatch();

    useEffect(() => {
        if(!candlesWithXCoord || ! candle_width) return;
        if(candlesWithXCoord[0].x > 0 && candlesWithXCoord.length < 200) {
            dispatch(setHistory(countNewArrayWithPreviousCandles(70, candlesWithXCoord)));
            setTransform((prev: any) => prev - (candle_width + gap)*70)
        }
    }, [candlesWithXCoord])

    return (
        <></>
    )
}

export default useExtendData;
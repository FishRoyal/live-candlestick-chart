import { CandleData, CandleX } from "../../../../../reduxStorage/candles/candleType";

export function mapToCountedX(candles: CandleData[], xScale: d3.ScaleTime<number, number, never>): CandleX[] {
    const countedX = candles.map((d, inx )=> {
        return {
            ...d, 
            x: xScale(new Date(d.startTimestamp * 1000))
        }
    })
    return countedX;
}
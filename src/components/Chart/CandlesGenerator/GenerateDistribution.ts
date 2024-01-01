import { CandleData } from "../../../reduxStorage/candles/candleType";
export function generateArrayFromCandles(candles: CandleData[]) {
    const distributionArray = [];
    for(let i = 0; i < candles.length; i++) {
        const candle = candles[i];
        distributionArray.push((-candle.enterPrice + candle.exitPrice)/2);
    }
    return distributionArray ;
}
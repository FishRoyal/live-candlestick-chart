import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setLastMessage } from "../../../reduxStorage/candles/candles";
import { CandleData } from "../../../reduxStorage/candles/candleType";
import { generateArrayFromCandles } from "./GenerateDistribution";

export function CandlesGenerator({candles}: {candles: CandleData[]}) {
    const dispatch = useDispatch();
    const lastCandle = useRef<null | CandleData>(null)
    const i = useRef<number>(0);

    useEffect(() => {
        const distribution = generateArrayFromCandles(candles);
        lastCandle.current = JSON.parse(JSON.stringify(candles[candles.length - 1]));
        i.current = 0;

        const intervalFunction = () => {     
            if(lastCandle.current === null || !distribution) return;  
            const randomIndex = Math.floor(Math.random() * distribution.length);
            let chosenDelta = distribution[randomIndex];
            let newCandle = JSON.parse(JSON.stringify(lastCandle.current));
            newCandle.currentPrice = newCandle.currentPrice + chosenDelta;
            if (i.current % 60 === 0) {
                newCandle.low = newCandle.exitPrice;
                newCandle.high = newCandle.exitPrice;
                newCandle.isnew = true;
                newCandle.startTimestamp = newCandle.currentTimestamp;
                newCandle.candleId = "ETHUSDT" + (newCandle.currentTimestamp).toString();
                newCandle.enterPrice = newCandle.exitPrice;
                chosenDelta = 0;
                newCandle.currentPrice = newCandle.exitPrice;
                newCandle.exitPrice = 0;
            }
            if((i.current + 1) % 60 === 0) {
                newCandle.exitPrice = newCandle.currentPrice;
                newCandle.endTimestamp = newCandle.currentTimestamp;
            }
            newCandle.currentTimestamp = newCandle.currentTimestamp + 1;
            
            if(newCandle.low > newCandle.currentPrice) {
                newCandle.low = newCandle.currentPrice;
            }
            if(newCandle.high < newCandle.currentPrice) {
                newCandle.high = newCandle.currentPrice;
            }
            lastCandle.current = newCandle;
            dispatch(setLastMessage(newCandle))
            i.current++;
        }
        const interval = setInterval(intervalFunction, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <></>
    )
}
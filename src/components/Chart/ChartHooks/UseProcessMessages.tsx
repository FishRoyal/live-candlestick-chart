import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setHistory, setXData } from "../../../reduxStorage/candles/candles";
import { CandlesData } from "../../../reduxStorage/candles/candleType";
import { countXData } from "../dataHook";

const useProcessMessages = ({candles, d3Container, chart_dimentions, deafault_candles_amount_on_screen, zoom, gap, transform}: {
    candles: CandlesData,
    d3Container: React.MutableRefObject<null>,
    chart_dimentions: {
        width: number,
        height: number
    },
    deafault_candles_amount_on_screen: number,
    zoom: number,
    gap: number,
    transform: number
}) => {
    
    const dispatch = useDispatch();

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
    }, [candles.lastMessage, d3Container.current, zoom, transform]);
}

export default useProcessMessages;
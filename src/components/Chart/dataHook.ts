import { CandleData, CandlesXData } from "../../reduxStorage/candles/candleType";
import { mapToCountedX } from "./D3/drawPack/utils/mapToCountedX";
import { getScaleTime } from "./D3/drawPack/workers/XScaleTime/getScaleTime";

export const countXData = (candles: CandleData[], height_canvas: number, width_canvas: number, amountToShow: number, gap: number, transform: number) : CandlesXData => {
    const [x, candle_width] = getScaleTime(candles, amountToShow, width_canvas, gap);
    const candle_width_with_gap = candle_width + gap;
    //gets xAxis function

    //counts and binds x coordinate to candles array
    const candlesWithXCoord = mapToCountedX(candles, x, transform);

    return {
        x,
        candle_width_with_gap,
        candle_width,
        candlesWithXCoord
    }

}
import { CandleData, CandlesXData } from "../../reduxStorage/candles/candleType";
import { mapToCountedX } from "./D3/drawPack/utils/mapToCountedX";
import { getScaleTime } from "./D3/drawPack/workers/XScaleTime/getScaleTime";
import { getXAxis } from "./D3/drawPack/workers/XScaleTime/getXAxis";

export const countXData = (candles: CandleData[], height_canvas: number) : CandlesXData => {
    const gap = 5;
    const [x, candle_width] = getScaleTime(candles, 10, 500, gap);
    const candle_width_with_gap = candle_width + gap;
    //gets xAxis function
    const xAxis = getXAxis(x, 75, height_canvas);

    //counts and binds x coordinate to candles array
    const candlesWithXCoord = mapToCountedX(candles, x);

    return {
        x,
        candle_width_with_gap,
        candle_width,
        xAxis,
        candlesWithXCoord
    }

}
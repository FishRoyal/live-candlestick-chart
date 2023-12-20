import { CandleData } from "../../../../../../reduxStorage/candles/candleType";
import * as d3 from "d3";

export function getScaleTime(candles: CandleData[], amountToShow: number, canvasWidth: number, gap: number): [d3.ScaleTime<number, number, never>, number] {
    
    const x =
        d3.scaleTime()
            .range([0, canvasWidth * candles.length / amountToShow]);


    const minDate = d3.min(candles, d => new Date(d.startTimestamp * 1000))!;

    const lastTimestamp = candles[candles.length - 1].startTimestamp;
    const firstTimestamp = candles[0].startTimestamp;
    //count right point of xScale domain
    const candle_width = canvasWidth / amountToShow - gap;
    const x_right = new Date(lastTimestamp * 1000);

    x.domain([
        minDate,
        x_right
    ])

    return [x, candle_width];
}
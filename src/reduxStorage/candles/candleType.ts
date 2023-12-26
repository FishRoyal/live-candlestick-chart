import * as d3 from 'd3';

export type CandleData = {
    symbol: string, // for ex. ETHUSDT
    high: number, // for ex. 1234.34
    currentPrice: number, // for ex. 1234.34,
    endTimestamp: number,
    isnew: boolean,
    candleId: string, // for ex. "ETHUSDT1667234055"
    startTimestamp: number,
    enterPrice: number,
    low: number,
    exitPrice: number, //if 0 then not closed
    type: string,
    candlesWithXCoord?: number,
    currentTimestamp: number
}

export type CandleX = CandleData & {
    x: number // x coord
}

export type CandlesXData = {
    x: d3.ScaleTime<number, number, never>,
    candle_width: number,
    candle_width_with_gap: number,
    candlesWithXCoord: CandleX[]
}

export type CandlesData = {
    lastMessage: CandleData,
    history: CandleData[] | null,
    xData: CandlesXData | null
}
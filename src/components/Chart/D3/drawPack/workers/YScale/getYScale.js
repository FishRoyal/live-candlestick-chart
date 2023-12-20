import * as d3 from 'd3'

export function getYScale(visCandles, height, padding) {
    const yScale = d3.scaleLinear()
        .domain([d3.min(visCandles, d=>d.low), d3.max(visCandles, d=>d.high)])
        .range([height - padding[0], padding[1]])
        
    return yScale;
}
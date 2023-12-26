import { drawLine} from "./drawPack/utils/drawLine";
import { drawRoundedRect } from "./drawPack/utils/drawCandle";
import { countXData } from "../dataHook";
import { getXVisibleRangeWithPadding } from "./drawPack/utils/getXVisibleRangeWithPadding";
import { getVisibleCandles } from "./drawPack/utils/getVisibleCandles";
import { getYScale } from "./drawPack/workers/YScale/getYScale";

import * as d3 from "d3"
import { drawXAxis } from "./drawPack/workers/XScaleTime/drawXAxis";
import { drawYAxis } from "./drawPack/workers/YScale/drawYAxis";

export function draw(custom, context, zoom, gap, chart_dimentions, candles, deafault_candles_amount_on_screen, transform) {
    const {candle_width, candle_width_with_gap, candlesWithXCoord, x} = countXData(candles.history, chart_dimentions.height, chart_dimentions.width, deafault_candles_amount_on_screen / zoom, gap, transform);

    //counts visible range + padding from current transform
    const xRange = getXVisibleRangeWithPadding(0, 1000, -10);

    //left candles, which x coordinate is in xRange
    let visCandles = getVisibleCandles(candlesWithXCoord, xRange, 0)

    //if nothing is visible, do nothing
    if(visCandles.length === 0) {
        visCandles = candlesWithXCoord.slice(candlesWithXCoord.length - 7)
    }

    //gets current yScale for visible interval of candles
    const y = getYScale(visCandles, chart_dimentions.height, [20, 20])
    context.clearRect(0, 0, chart_dimentions.width, chart_dimentions.height);
    const rectsInput = custom.selectAll('custom.rect')
            .data(candlesWithXCoord)

    drawXAxis(context, x, chart_dimentions.height, candle_width);
    drawYAxis(context, y, chart_dimentions.height, chart_dimentions.width);

    rectsInput
        .join(
            enter => {
                return enter
                    .append('custom')
                    .attr('class', 'rect')
                    .attr('x', function(d) {
                        return d.x;
                    })
                    .attr('y', d => d.enterPrice > d.currentPrice? y(d.enterPrice) : y(d.currentPrice))
                    .attr('fillStyle', d => d.enterPrice > d.currentPrice ? '#2d2f31': '#C6C6CA')
                    .attr('strokeFill', '#C6C6CA')
                    .attr('width', candle_width)
                    .attr('height', d => {
                        return Math.abs(y(d.enterPrice) - y(d.currentPrice))
                    })
            },
            update => {
                return update
                    .attr('x', function(d) {
                        return d.x;
                    })
                    .attr('y', d => d.enterPrice > d.currentPrice? y(d.enterPrice) : y(d.currentPrice))
                    .attr('fillStyle', d => d.enterPrice > d.currentPrice ? '#2d2f31': '#C6C6CA')
                    .attr('strokeFill', '#C6C6CA')
                    .attr('width', candle_width)
                    .attr('height', d => {
                        return Math.abs(y(d.enterPrice) - y(d.currentPrice))
                    })
            }
        )
        

    const linesInput = custom.selectAll('custom.line')
        .data(candlesWithXCoord)

    linesInput
        .join(
            enter => {
                return enter
                    .append('custom')
                    .attr('class', 'line')
                    .attr('x1', d => d.x + candle_width/2)
                    .attr('x2', d => d.x + candle_width/2)
                    .attr('y1', d => {
                        return y(d.high)
                    })
                    .attr('y2', d => y(d.low))
                    .attr('strokeFill', '#C6C6CA')
            },
            update => {
                return update
                    .attr('x1', d => d.x + candle_width/2)
                    .attr('x2', d => d.x + candle_width/2)
                    .attr('y1', d => {
                        return y(d.high)
                    })
                    .attr('y2', d => y(d.low))
                    .attr('strokeFill', '#C6C6CA')
            }
        )
        

    const lines = custom.selectAll('custom.line')
    lines.each(function(d, i) {
        const node = d3.select(this);
        const x1 = parseInt(node.attr('x1'));
        const x2 = parseInt(node.attr('x2'));
        const y1 = parseInt(node.attr('y1'));
        const y2 = parseInt(node.attr('y2'));
        drawLine(x1, y1, x2, y2, node.attr('strokeFill'), 1, context)
    })

    const rects = custom.selectAll('custom.rect')

    rects.each(function(d, i) {
        const node = d3.select(this);
        const x = parseInt(node.attr('x'));
        const y = parseInt(node.attr('y'));
        const width = parseInt(node.attr('width'));
        const height = parseInt(node.attr('height'));
        drawRoundedRect(x, y, width, height, 2, context, node.attr('strokeFill'), node.attr('fillStyle'));
    })
    
}
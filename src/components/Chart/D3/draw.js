import { drawLine} from "./drawPack/utils/drawLine";
import { drawRoundedRect } from "./drawPack/utils/drawCandle";
import * as d3 from "d3"

export function draw(custom, context, y, candle_width, candlesWithXCoord) {
    const rectsInput = custom.selectAll('custom.rect')
            .data(candlesWithXCoord)

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
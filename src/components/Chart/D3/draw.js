import { drawLine} from "./drawPack/utils/drawLine";
import { drawRoundedRect } from "./drawPack/utils/drawCandle";
import * as d3 from "d3"

export function draw(custom, context) {
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
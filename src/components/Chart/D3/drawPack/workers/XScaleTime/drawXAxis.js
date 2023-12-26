import { getStartXEndX } from "./getXMinMax"
import * as d3 from "d3"
export function drawXAxis(context, xScale, height, candle_width) {

    const [startX, endX, tickTimeMS] = getStartXEndX(xScale, 50, height);
    
    
    let tickSize = 6,
        xTicks = d3.range(startX, endX, tickTimeMS*1000), 
        xTickFormat = d3.timeFormat("%H:%M:%S");
        
    const Y = height - 50;

    context.strokeStyle = "#5A5B5D";

    context.beginPath();
    xTicks.forEach(d => {
        context.moveTo(xScale(d) + candle_width / 2, 0);
        context.lineTo(xScale(d) + candle_width / 2, height - 8 - tickSize);
    });
    context.stroke();

    context.beginPath();
    context.moveTo(startX, Y + tickSize);
    context.lineTo(startX, Y);
    context.lineTo(endX, Y);
    context.lineTo(endX, Y + tickSize);
    context.stroke();

    context.textAlign = "center";
    context.textBaseline = "top";
    context.fillStyle = "#C6C6CA";

    xTicks.forEach(d => {
        context.beginPath();
        context.fillText(xTickFormat(d), xScale(d) + candle_width / 2, height - 5 - tickSize);
    });

}
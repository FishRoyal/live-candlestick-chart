import * as d3 from "d3"

export function drawCurrent(context, lastPrice, lastPriceVal, width, accuracy) {
    const flag_data = {
        width: 65,
        height: 25,
        dx: 15,
        dy: 5,
        path: "M14.8786 0.591027C15.3902 0.207385 16.0123 0 16.6517 0H61.0449C62.6769 0 64 1.32306 64 2.95513V22.0449C64 23.6769 62.6769 25 61.0449 25H16.6517C16.0123 25 15.3902 24.7926 14.8786 24.409L2.15214 14.8641C0.576072 13.6821 0.57607 11.3179 2.15214 10.1359L14.8786 0.591027Z"
    }
    
    context.strokeStyle = "#5A5B5D";
    
    context.beginPath();
    context.moveTo(0, lastPrice);
    context.lineTo(width - flag_data.width, lastPrice);
    context.stroke();

    context.save();
    context.translate(width - flag_data.width, lastPrice - flag_data.height / 2); // Move the path to the new position
    context.beginPath();
    const path = new Path2D(flag_data.path);
    context.fill(path);
    context.stroke();
    context.restore();

    context.fillStyle = "#2d2f31"
    context.beginPath();
    context.fillText(lastPriceVal.toFixed(2), width - 10, lastPrice);

}
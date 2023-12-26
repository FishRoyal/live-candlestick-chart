export function drawYAxis(context, yScale, height, X) {
    const startY = 10,
        endY = height - 10;
    const tickPadding = 3,
        tickSize = 6,
        yTicks = yScale.ticks(5),
        yTickFormat = yScale.tickFormat();
    context.strokeStyle = "#5A5B5D";
    
    context.beginPath();
    yTicks.forEach(d => {
        context.moveTo(X, yScale(d));
        context.lineTo(0, yScale(d));
    });
    context.stroke();

    context.beginPath();
    context.moveTo(X - tickSize, startY);
    context.lineTo(X, startY);
    context.lineTo(X, endY);
    context.lineTo(X - tickSize, endY);
    context.stroke();

    context.textAlign = "right";
    context.textBaseline = "middle";
    context.fillStyle = "#C6C6CA";
    yTicks.forEach(d => {
        context.beginPath();
        context.fillText(yTickFormat(d), X - tickSize - tickPadding, yScale(d) - 10);
    });
    
}
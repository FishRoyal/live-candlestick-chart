export function drawRoundedRect(x, y, width, height, cornerRadiusRaw, context, strokeColor, fillColor) {
    const cornerRadius = cornerRadiusRaw < height / 4 ? cornerRadiusRaw : height / 4
    context.beginPath();
    context.moveTo(x + cornerRadius, y);
    context.arcTo(x + width, y, x + width, y + height, cornerRadius);
    context.arcTo(x + width, y + height, x, y + height, cornerRadius);
    context.arcTo(x, y + height, x, y, cornerRadius);
    context.arcTo(x, y, x + width, y, cornerRadius);
    context.closePath();
    context.stroke();

    context.fillStyle = fillColor;
    context.fill();

    context.strokeStyle = strokeColor;
    context.stroke();
}
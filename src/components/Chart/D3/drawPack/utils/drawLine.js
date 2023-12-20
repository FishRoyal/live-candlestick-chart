export function drawLine(x1, y1, x2, y2, strokeColor, lineWidth, context) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.strokeStyle = strokeColor;
    context.lineWidth = lineWidth;
    context.stroke();
  }
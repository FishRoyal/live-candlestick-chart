export function drawCurveThroughPoints(points, strokeColor, lineWidth, context) {
    context.beginPath();
    context.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length - 2; i += 2) {
      const xc1 = (points[i].x + points[i + 1].x) / 2;
      const yc1 = (points[i].y + points[i + 1].y) / 2;
      const xc2 = (points[i + 1].x + points[i + 2].x) / 2;
      const yc2 = (points[i + 1].y + points[i + 2].y) / 2;

      context.bezierCurveTo(points[i].x, points[i].y, xc1, yc1, points[i + 1].x, points[i + 1].y);
      context.bezierCurveTo(points[i + 1].x, points[i + 1].y, xc2, yc2, points[i + 2].x, points[i + 2].y);
    }

    // Set the stroke color and line width
    context.strokeStyle = strokeColor;
    context.lineWidth = lineWidth;

    // Stroke the path
    context.stroke();
}
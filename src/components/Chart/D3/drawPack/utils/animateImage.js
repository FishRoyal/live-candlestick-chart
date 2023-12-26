import { getPointOnCurve } from "./getPoinOnCurve"
import { drawCurveThroughPoints } from "./drawCurveThougPoints";

export function animateImage(context, width, height, {points}, image, custom, isContinue) {
    if(!isContinue) return;

    drawCurveThroughPoints(points, "blue", 2, context);
    const t = (Date.now() % 100000) / 100000; 
    const pointOnCurve = getPointOnCurve(points, t);
    // Draw the image at the calculated position
    context.drawImage(image, pointOnCurve.x - 16.5, pointOnCurve.y - 33, 33, 33);
    // Request the next animation frame
    requestAnimationFrame(() => animateImage(context, width, height, {points}, image, custom, isContinue));
  }
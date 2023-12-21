import  { drawCurveThroughPoints } from "./drawCurveThougPoints"
import { getPointOnCurve } from "./getPoinOnCurve"
import { draw } from"../../draw"
export function animateImage(context, width, height, points, image, custom) {
    // Clear the canvas on each frame
    context.clearRect(0, 0, width, height);

    // Draw the curve through points
    // drawCurveThroughPoints(points, "blue", 2, context);
    draw(custom, context);

    // Calculate the position on the curve based on time
    const t = (Date.now() % 150000) / 150000; // Cycle every 5 seconds
    const pointOnCurve = getPointOnCurve(points, t);
    // Draw the image at the calculated position
    context.drawImage(image, pointOnCurve.x - 16.5, pointOnCurve.y - 33, 33, 33);

    // Request the next animation frame
    requestAnimationFrame(() => animateImage(context, width, height, points, image, custom));
  }
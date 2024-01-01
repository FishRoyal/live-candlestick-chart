export function getPointOnCurve(points, t) {
    const n = points.length - 1;
    const tIndex = t * n;
    const index = Math.floor(tIndex);
    const u = tIndex - index;

    const p0 = points[Math.max(0, index - 1)];
    const p1 = points[index];
    const p2 = points[Math.min(n, index + 1)];
    const p3 = points[Math.min(n, index + 2)];
    if(!p0 || !p1 || !p2 || !p3) return undefined;

    const u2 = u * u;
    const u3 = u * u2;

    const qx = 0.5 * ((2 * p1.x) + (-p0.x + p2.x) * u + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * u2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * u3);
    const qy = 0.5 * ((2 * p1.y) + (-p0.y + p2.y) * u + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * u2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * u3);

    return { x: qx, y: qy };
  }
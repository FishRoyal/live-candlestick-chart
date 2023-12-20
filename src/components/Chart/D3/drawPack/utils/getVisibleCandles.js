export function getVisibleCandles(candlesWithXCoord, xRange, graphXTransform) {
    return candlesWithXCoord.filter(d => d.x + graphXTransform >= xRange[0] && d.x + graphXTransform <= xRange[1])
}
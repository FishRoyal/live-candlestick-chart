export function getXVisibleRangeWithPadding(transform, widthSVG, padding) {
    const xRange = [-transform - padding, -transform + widthSVG + padding];
    return xRange;
}
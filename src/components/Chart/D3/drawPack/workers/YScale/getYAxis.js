import * as d3 from "d3"

export function getYAxis(yScale, ticks, width, accuracy) {
    const axis = d3.axisRight(yScale)
                .tickSizeOuter(0)
                .tickSizeInner(width + 100)
                .tickFormat(d => {
                    return ""
                })
                .ticks(ticks)

    const axisTicks = d3.axisRight(yScale)
                    .tickSizeInner(0)
                    .tickSizeOuter(0)
                    .tickFormat(d => {
                        return d.toFixed(accuracy)
                    })
                    .ticks(ticks)

    return [axis, axisTicks];
}
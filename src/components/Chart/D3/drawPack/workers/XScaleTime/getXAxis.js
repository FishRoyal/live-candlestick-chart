import * as d3 from "d3"

export function getXAxis(xScale, intervalTick, height) {
    let [min, max] = xScale.domain();
    const tickAmount = xScale.range()[1]/intervalTick;
    let tickTimeMS = Math.round((max - min)/tickAmount);
    const points = [30, 60, 180, 900, 2700, 5400, 10800, 21600, 43200];
    for(let i = 0; i < points.length; i++) {
        if(points[i]*1000 - tickTimeMS >= 0) {
            const date = (new Date(min)).toISOString().split("T")[1].split(".")[0].split(":");
            let j = 2;
            tickTimeMS = points[i];
            if(tickTimeMS >= 180) {
                if(tickTimeMS <= 5400) {
                    j = 1;
                } else {
                    j = 0;
                }
            }
            const checkField = date[j];
            if(tickTimeMS !== 5400) {
                const digit = Math.round(tickTimeMS / Math.pow(60, 2 - j));
                const toAdd = (digit - checkField % digit) * Math.pow(60, 2 - j) * 1000;
                min = new Date(min.getTime() + toAdd);
            } else {
                min = new Date(min.getTime() + (30 - checkField % 30) * Math.pow(60, 2- j) * 1000);
            }
            break;
        }
    }

    const axis = d3.axisBottom(xScale)
                .tickSizeOuter(0)
                .tickSizeInner(height - 30)
                .tickValues(d3.range(min, max, tickTimeMS*1000))
                .tickFormat(d3.timeFormat("%H:%M:%S"))

    return axis;
}
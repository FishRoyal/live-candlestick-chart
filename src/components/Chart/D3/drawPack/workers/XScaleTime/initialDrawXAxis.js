export function initialDrawXAxis(svg, candle_width_visible_part, xAxis) {
    const axis = svg
        .selectAll('.g-axis')
        .data([0])
        .enter()
        .append('g')
        .attr('class', 'g-axis')
        .attr('transform', `translate(${candle_width_visible_part/2}, 0)`)
        .call(xAxis)
    
    axis
        .select('.domain')
        .attr('stroke-width', 0)

    axis
        .selectAll('.tick')
        .selectAll('line')
        .attr('color', '#2E2E2E')
        .attr('opacity', 1)
}
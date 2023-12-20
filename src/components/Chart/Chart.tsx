import { useEffect, useRef } from "react";
import * as d3 from "d3";
import candlesData from "./data.json";

const Chart = () => {
    
    const d3Container = useRef(null);
    const canvasRef  = useRef(null);

    useEffect(() => {
        const canvas = d3.select(d3Container.current)
            .append('canvas')
            .attr('width', 500)
            .attr('height', 300);
        const context = canvas?.node()?.getContext('2d');

        if(!context) {
            return;
        }
        
        const customBase = document.createElement('custom');
        const custom = d3.select(customBase);

        const join = custom.selectAll('custom.rect')
            .data(candlesData.pair.map((val, inx) => {
                return inx;
            }))

        join
            .enter()
            .append('custom')
            .attr('class', 'rect')
            .attr('x', function(d) {
                return d * 20;
            })
            .attr('y', '24')
            .attr('width', '10')
            .attr('height', '20')
            .attr('fillStyle', 'white')

        const elements = custom.selectAll('custom.rect')

        elements.each(function(d, i) {
            const node = d3.select(this);
            context.fillStyle = node.attr('fillStyle');
            const x = parseInt(node.attr('x'));
            const y = parseInt(node.attr('y'));
            const width = parseInt(node.attr('width'));
            const height = parseInt(node.attr('height'));
            context.fillRect(x, y, width, height)
        })

        

    }, [d3Container, canvasRef])


    return ( 
        <div ref={d3Container}>
        </div>
        
    )
}

export default Chart;
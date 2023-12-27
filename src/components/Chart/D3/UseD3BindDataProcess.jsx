import { useEffect } from "react"
import * as d3 from "d3"; 

const useD3BindDataProcess = ({customBase, candlesWithXCoord, y, candle_width, chart_dimentions, transform}) => {

    useEffect(() => {
        if(!customBase.current || !candlesWithXCoord || !y || !candle_width) return;
        const custom = d3.select(customBase.current);
        const rectsInput = custom.selectAll('custom.rect')
            .data(candlesWithXCoord)

        rectsInput
            .join(
                enter => {
                    return enter
                        .append('custom')
                        .attr('class', 'rect')
                        .attr('x', function(d) {
                            return d.x;
                        })
                        .attr('y', d => d.enterPrice > d.currentPrice? y(d.enterPrice) : y(d.currentPrice))
                        .attr('fillStyle', d => d.enterPrice > d.currentPrice ? '#2d2f31': '#C6C6CA')
                        .attr('strokeFill', '#C6C6CA')
                        .attr('width', candle_width)
                        .attr('height', d => {
                            return Math.abs(y(d.enterPrice) - y(d.currentPrice))
                        })
                },
                update => {
                    return update
                        .attr('x', function(d) {
                            return d.x;
                        })
                        .transition()
                        .duration(!candlesWithXCoord[candlesWithXCoord.length - 1].isnew ? 200 : 0)
                        .attr('y', d => d.enterPrice > d.currentPrice? y(d.enterPrice) : y(d.currentPrice))
                        .attr('fillStyle', d => d.enterPrice > d.currentPrice ? '#2d2f31': '#C6C6CA')
                        .attr('strokeFill', '#C6C6CA')
                        .attr('width', candle_width)
                        .attr('height', d => {
                            return Math.abs(y(d.enterPrice) - y(d.currentPrice))
                        })
                }
            )
            

        const linesInput = custom.selectAll('custom.line')
            .data(candlesWithXCoord)

        linesInput
            .join(
                enter => {
                    return enter
                        .append('custom')
                        .attr('class', 'line')
                        .attr('x1', d => d.x + candle_width/2)
                        .attr('x2', d => d.x + candle_width/2)
                        .attr('y1', d => {
                            return y(d.high)
                        })
                        .attr('y2', d => y(d.low))
                        .attr('strokeFill', '#C6C6CA')
                },
                update => {
                    return update
                        .attr('x1', d => d.x + candle_width/2)
                        .attr('x2', d => d.x + candle_width/2)
                        .transition()
                        .duration(!candlesWithXCoord[candlesWithXCoord.length - 1].isnew ? 200 : 0)
                        .attr('y1', d => {
                            return y(d.high)
                        })
                        .attr('y2', d => y(d.low))
                        .attr('strokeFill', '#C6C6CA')
                }
            )

        const currentPrice = custom.selectAll('currentPrice.line')
            .data([candlesWithXCoord[candlesWithXCoord.length - 1]])

        currentPrice
            .join(
                enter => {
                    return enter
                        .append('currentPrice')
                        .attr('class', 'line')
                        .attr('x1',0)
                        .attr('x2', chart_dimentions.width - 65)
                        .transition()
                        .duration(200)
                        .attr('y1', d => {
                            return y(d.currentPrice)
                        })
                        .attr('y2', d => y(d.currentPrice))
                },
                update => {
                    return update
                        .transition()
                        .duration(200)
                        .attr('y1', d => {
                            return y(d.currentPrice)
                        })
                        .attr('y2', d => y(d.currentPrice))
                }
            )

        const currentPriceFlag = custom.selectAll('currentPrice.flag')
            .data([candlesWithXCoord[candlesWithXCoord.length - 1]])

        currentPriceFlag
            .join(
                enter => {
                    return enter
                        .append('currentPrice')
                        .attr('class', 'flag')
                        .transition()
                        .duration(200)
                        .attr('y', d => {
                            return y(d.currentPrice)
                        })
                },
                update => {
                    return update
                        .transition()
                        .duration(200)
                        .attr('y', d => {
                            return y(d.currentPrice)
                        })
                }
            )
        
        // const xTicks = custom.selectAll('xTicks.tick')
        //     .data(candlesWithXCoord)

        // xTicks
        //     join(
        //         enter => {
        //             return enter
        //                 .append('xTicks')
        //                 .attr('class', 'tick')
        //                 .transition()
        //                 .duration()
        //                 .attr('x', d => {
        //                     return d.x + transform
        //                 })
        //         },
        //         update => {
        //             return update
        //                 .transition()
        //                 .duration()
        //                 .attr('x', d => {
        //                     return d.x + transform
        //                 })
        //         }
        //     )

    }, [customBase.current, candlesWithXCoord, y])
   
}

export default useD3BindDataProcess;
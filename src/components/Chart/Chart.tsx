import { useEffect, useRef } from "react";
import * as d3 from "d3";
import candlesData from "./data.json";
import { countXData } from "./dataHook";
import candles from "../../reduxStorage/candles/candles";
import { getXVisibleRangeWithPadding } from "./D3/drawPack/utils/getXVisibleRangeWithPadding";
import { getVisibleCandles } from "./D3/drawPack/utils/getVisibleCandles";
import { getYScale } from "./D3/drawPack/workers/YScale/getYScale";
import { drawRoundedRect } from "./D3/drawPack/utils/drawCandle";
import { drawLine } from "./D3/drawPack/utils/drawLine";
import { drawCurveThroughPoints } from "./D3/drawPack/utils/drawBezier";
import { animateImage } from "./D3/drawPack/utils/animateImage";

const chart_dimentions = {
    width: 1500,
    height: 500
}

const deafault_candles_amount_on_screen = chart_dimentions.width / 20;
const zoom = 1;
const gap = 5;

const Chart = () => {
    
    const d3Container = useRef(null);
    const canvasRef  = useRef(null);

    useEffect(() => {
        const canvas = d3.select(d3Container.current)
            .append('canvas')
            .attr('width', chart_dimentions.width)
            .attr('height', chart_dimentions.height);

        const context = canvas?.node()?.getContext('2d');

        if(!context) {
            return;
        }
        
        const customBase = document.createElement('custom');
        const custom = d3.select(customBase);
        const {candle_width, candle_width_with_gap, candlesWithXCoord, x, xAxis} = countXData(candlesData.pair, chart_dimentions.height, chart_dimentions.width, deafault_candles_amount_on_screen / zoom, gap);

        //counts visible range + padding from current transform
        const xRange = getXVisibleRangeWithPadding(0, 1000, 50);

        //left candles, which x coordinate is in xRange
        let visCandles = getVisibleCandles(candlesWithXCoord, xRange, 0)

        //if nothing is visible, do nothing
        if(visCandles.length === 0) {
            visCandles = candlesWithXCoord.slice(candlesWithXCoord.length - 7)
        }

        //gets current yScale for visible interval of candles
        const y = getYScale(visCandles, 300, [0, 0])

        const rectsInput = custom.selectAll('custom.rect')
            .data(candlesWithXCoord)

        rectsInput
            .enter()
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

        const linesInput = custom.selectAll('custom.line')
            .data(candlesWithXCoord)

        linesInput
            .enter()
            .append('custom')
            .attr('class', 'line')
            .attr('x1', d => d.x + candle_width/2)
            .attr('x2', d => d.x + candle_width/2)
            .attr('y1', d => {
                return y(d.high)
            })
            .attr('y2', d => y(d.low))
            .attr('strokeFill', '#C6C6CA')

        const image = new Image();
        image.src = "/img/moon.png";

        const points_for_moon_path_top = candlesWithXCoord.map((d, inx) => {
            return { 
                x: d.x + candle_width/2 ,
                y: y(d.high) 
            }
        })
        const points_for_moon_path_left_corner = candlesWithXCoord.map((d, inx) => {
            return { 
                x: d.x ,
                y: d.enterPrice > d.currentPrice ? y(d.enterPrice) : y(d.currentPrice) 
            }
        })
        const points_for_moon_path_right_corver = candlesWithXCoord.map((d, inx) => {
            return { 
                x: d.x + candle_width,
                y: d.enterPrice > d.currentPrice ? y(d.enterPrice)  : y(d.currentPrice) 
            }
        })
        const points_for_moon_path = [...points_for_moon_path_top, ...points_for_moon_path_left_corner, ...points_for_moon_path_right_corver];
        points_for_moon_path.sort((a, b) => a.x - b.x);
    
        
        image.onload = function() {
            animateImage(context, chart_dimentions.width, chart_dimentions.height, points_for_moon_path, image, custom);
        };
      
          // Function to get a point on the curve based on time (t)
          
        
        

    }, [d3Container, canvasRef])


    return ( 
        <div ref={d3Container}>
        </div>
        
    )
}

export default Chart;
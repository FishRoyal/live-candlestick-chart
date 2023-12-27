import { ScaleLinear } from "d3";
import { useEffect, useState } from "react";
import { CandleX } from "../../reduxStorage/candles/candleType";

const useCountMoonPoints = ({candlesWithXCoord, candle_width, y}: {
    candlesWithXCoord: CandleX[] | null | undefined,
    candle_width: number | null | undefined,
    y: (number[] & ScaleLinear<number, number, never>) | null
}) => {
    
    const [points_for_moon_path, setPoints] = useState<{x:number, y:number}[] | null>(null)

    useEffect(() => {
        if(!candlesWithXCoord || !candle_width || !y) return;

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
        let points = [...points_for_moon_path_top, ...points_for_moon_path_left_corner, ...points_for_moon_path_right_corver];
        points.sort((a, b) => a.x - b.x);
        setPoints(points)

    }, [candlesWithXCoord, candle_width, y])

    return points_for_moon_path;
        
}

export default useCountMoonPoints;
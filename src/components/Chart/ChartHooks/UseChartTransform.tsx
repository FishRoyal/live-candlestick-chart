import { useEffect, useState } from "react"
import * as d3 from "d3";

const useChartTransform = ({canvasRef}: {
    canvasRef: React.MutableRefObject<d3.Selection<HTMLCanvasElement, unknown, null, undefined> | null>,
}) => {
    const [transform, setTransform] = useState(0);

    useEffect(() => {
        if(canvasRef.current === null ) return;
        const drag = d3.drag()
            .on("drag", function(event) {
                setTransform(prev => prev + event.dx)
            })
        canvasRef.current
            .call(drag as any)

    }, [canvasRef.current])

    return transform
}

export default useChartTransform;
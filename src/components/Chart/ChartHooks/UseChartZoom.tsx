import { useEffect, useState } from "react";
import * as d3 from "d3";

const useChartZoom = ({canvasRef}: {
    canvasRef: React.MutableRefObject<d3.Selection<HTMLCanvasElement, unknown, null, undefined> | null>
}) => {
    const [zoom, setZoom] = useState(1);
    useEffect(() => {
        if(canvasRef.current === null) return;
        const zoom = d3.zoom()
            .scaleExtent([0.9, 2])
            .on('zoom', (event) => {
                const transform = event.transform;
                setZoom(transform.k)
            })

        canvasRef.current
            .call(zoom as any)
    }, [canvasRef.current])

    return zoom;
}

export default useChartZoom;
import watchClicks from '@/utils/getcoordinate';
import { useState, useEffect } from 'react';

export function useTrackerSquare(mapRef) {
    const [pos, setPos] = useState({x:0, y: 0})
    const [rect, setRect] = useState({width: 0, height: 0});

    useEffect(() => {
          if (mapRef.current) {
             const stopWatching = watchClicks((coords) => {
                setPos(coords)
                const square = document.querySelector('.square');
                const size = mapRef.current.getBoundingClientRect();
                setRect(size)
                square.style.display = "block";
            }, mapRef.current)
            return () => {
                stopWatching();
            }
          }
    }, [mapRef])

    return {pos, rect}
}
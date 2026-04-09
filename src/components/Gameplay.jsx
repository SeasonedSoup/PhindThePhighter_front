import testMap from '@/assets/maps/BogioSPS_Map.png';

import { useEffect, useRef, useState } from 'react';
import watchClicks from '@/getcoordinate';

import "@/styles/Gameplay.css";
const initialSeconds = 3;

export default function Gameplay() {
    const [pos, setPos] = useState({x:0, y: 0})
    const [countdown, setCountdown] = useState(initialSeconds);
    const [timer, setTimer] = useState(0);
    const mapRef = useRef(null);

    //HANDLE CLICKS EFFECT
    useEffect(() => {
      if (mapRef.current) {
         const stopWatching = watchClicks((coords) => {
            setPos(coords)
            const square = document.querySelector('.square');
    
            square.style.left = coords.x + '%';
            square.style.top = coords.y + '%';
            square.style.display = "block";
        }, mapRef.current)
        return () => {
            stopWatching();
        }
      }
    }, [])

    //HANDLE TIMER EFFECT 
    useEffect(() => {
        if (countdown <= 0) return;

        const countdownId = setInterval(() => {
            setCountdown((prev) => Math.max(0, prev - 1));
        }, 1000)

        return () => clearInterval(countdownId);
    }, [countdown])

    //HANDLE SCORE EFFECT 
    useEffect(() => {
      if (countdown > 0) return;
      
      const timerId = setInterval(() => {
        setTimer((prev) => Math.max(0, prev + 1));
      }, 1000)

      
        return () => clearInterval(timerId);

    }, [countdown])
    return (
          <div className='screen'>
            <div className='stats'>
              <h1>Phind The Phighter!</h1>
              <h1>Timer: {timer} </h1>
              <h1>{Math.round(pos.x)}, {Math.round(pos.y)}</h1>
            </div>
            <div className='gameScreen'>
              <div className='map' ref={mapRef}>
                <img src={testMap} alt="selected map" />
                <div className='square'></div>
              </div>
            </div>

            <div className='dropdownMenu'>
              <h1>PHIND THESE CHARACTERS!</h1>
              <div className='characters'>
                <img src={coil} alt="coil" />
                <img src={medkit} alt="medkit" />
                <img src={sword} alt="sword" />
              </div>
            </div>
          </div>
    )
}

import coil from "@/assets/characters/coil.png"
import medkit from "@/assets/characters/medkit.png"
import sword from "@/assets/characters/sword.png"


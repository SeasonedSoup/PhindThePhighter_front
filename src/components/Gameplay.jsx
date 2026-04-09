import testMap from '../assets/BogioSPS_Map.png';

import { useEffect, useState } from 'react';
import watchClicks from '../getcoordinate';

import "../styles/Gameplay.css";
const initialSeconds = 3;

export default function Gameplay() {
    const [pos, setPos] = useState({x:0, y: 0})
    const [countdown, setCountdown] = useState(initialSeconds);
    const [timer, setTimer] = useState(0);
    //HANDLE CLICKS EFFECT
    useEffect(() => {
        const stopWatching = watchClicks((coords) => {
            setPos(coords)
            const square = document.querySelector('.square');
    

            square.style.left = coords.x + 'px';
            square.style.top = coords.y + 'px';
            square.style.display = "block";
        })


        return () => {
            stopWatching();
        }
    }, [])

    //HANDLE TIMER EFFECT 
    useEffect(() => {
        if (countdown <= 0) return;

        const countdownId = setInterval(() => {
            setCountdown((prev) => Math.max(0, prev - 1));
        }, 1000)

        return () => clearInterval(countdownId);
    })

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
              <h2>Current pos X:{pos.x}, Y:{pos.y}</h2>
            </div>
            <div className='gameScreen'>
              <div className='map'>
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

import coil from "../assets/coil.png"
import medkit from "../assets/medkit.png"
import sword from "../assets/sword.png"


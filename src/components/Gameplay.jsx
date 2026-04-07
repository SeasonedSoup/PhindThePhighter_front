import testMap from '../assets/BogioSPS_Map.png';

import { useEffect, useState } from 'react';
import watchClicks from '../getcoordinate';

import "../styles/Gameplay.css";
const initialSeconds = 3;

export default function Gameplay() {
    const [pos, setPos] = useState({x:0, y: 0})
    const [countdown, setCountdown] = useState(initialSeconds);
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

        const timerId = setInterval(() => {
            setCountdown((prev) => Math.max(0, prev - 1));
        }, 1000)

        return () => clearInterval(timerId);
    })
    return (
          <div className='screen'>
      <div className='square'></div>
      <div className='stats'>
        <h1>Phind The Phighter!</h1>
        <h1>Starting game in {countdown} </h1>
        <h2>Current pos X:{pos.x}, Y:{pos.y}</h2>
        <h2>Choose a map and characters to find!</h2>
      </div>
      <div className='gameScreen'>
        <div className='map'>
          <img src={testMap} alt="selected map" />
        </div>
      </div>

      <div className='dropdownMenu'>
        FIND THESE CHARACTERS!
        <button>Confirm</button>
      </div>
    </div>
    )
}


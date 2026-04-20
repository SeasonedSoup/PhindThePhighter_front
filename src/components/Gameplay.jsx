import "@/styles/Gameplay.css";

import { useEffect, useRef, useState } from 'react';
import { useParams } from "react-router";

import { formatTime } from '@/utils/formatTimer';
import { getMapByName } from "@/utils/getMap";
import { getIdByMapName } from "../utils/getMap";
import watchClicks from '@/utils/getcoordinate';
import getUrl from '@/utils/getUrl';


import ScoreForm from './ScoreForm';

export default function Gameplay() {
    const [pos, setPos] = useState({x:0, y: 0})
    const [countdown, setCountdown] = useState(sessionStorage.getItem("cdFinished") === "true" ? 0 : 3);
    const [timer, setTimer] = useState(() => sessionStorage.getItem("seconds") ? JSON.parse(sessionStorage.getItem("seconds")): 0);
    const [rect, setRect] = useState(null);
    const mapRef = useRef(null);
    const {mapName} = useParams();
    const currentMap = getMapByName(mapName)
    const [phighterStatus, setPhighterStatus] = useState({1: 'Not Found', 2: "Not Found", 3: "Not Found"})
    const winCondition = Object.values(phighterStatus).every((status) => status === 'Found');

    useEffect(() => {
      if (mapRef.current) {
         const stopWatching = watchClicks((coords) => {
            setPos(coords)
            const square = document.querySelector('.square');
            const size = mapRef.current.getBoundingClientRect();
            setRect(size)
            square.style.left = (coords.x * size.width) + 'px';
            square.style.top = (coords.y * size.height) + 'px';
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
      if (countdown > 0 || winCondition) return;
      
      const timerId = setInterval(() => {
        setTimer((prev) => {
          const next = prev + 10
          sessionStorage.setItem("seconds", JSON.stringify(next));
          return next;
        });
      }, 10)

      
        return () => clearInterval(timerId);

    }, [countdown, winCondition])

    //PREVENT COUNTDOWN RESET
    useEffect(() => {
      if (countdown == 0) {
        sessionStorage.setItem("cdFinished",true);
      }
    }, [countdown])
    
    //HANDLE TIMER PERSISTENCE 
    useEffect(() => {
      sessionStorage.setItem("seconds", timer);
    }, [timer])

    //ASYNC FUNCTION CALLS

    async function validateAnswer(character, index) {
      const response = await fetch(getUrl(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({character: character, coordinates: pos})
      })
    const result = await response.json()
    console.log("Status: ", result.status)

    setPhighterStatus((prev) => {
      const newStatus = result.status === 'Found' ? 'Found' :'Not Found';
      return {
        ...prev, 
        [index]: newStatus 
      }
    })
    }
    return (
          <div className='screen'>
            {countdown > 0 && <div className='modal'>
              <div className='modal-content'>
                Game is about to start in: {countdown}
              </div>
            </div>}
            { winCondition === true && <ScoreForm score={timer} mapId={getIdByMapName(mapName)}/> }
            <div className='stats'>
              <h1>Phind The Phighter!</h1>
              <h1>Timer: {formatTime(timer)} </h1>
              <h1>
                  X: {rect ? (pos.x * 100).toFixed(1) : 0},

                 Y: {rect ? (pos.y * 100).toFixed(1) : 0}
              </h1>
            </div>
            <div className='gameScreen'>
              <div className='map' ref={mapRef}>
                <img src={currentMap} alt="selected map" />
                <div className='square' ></div>
              </div>
            </div>

            <div className='dropdownMenu'>
              <h1>PHIND THESE PHIGHTERS!</h1>
              <div className='characters'>
                <div className='characterCard'>
                  <img src={coil} alt="coil" />
                  <h3>{phighterStatus[1]}</h3>
                  <div className='choices'>                    
                    <img className="confirm" src={confirm} alt="confirm" onClick={() => validateAnswer('Coil', 1)}/>
                  </div>
                </div>
                
                 <div className='characterCard'>
                  <img src={medkit} alt="medkit" />
                  <h3>{phighterStatus[2]}</h3>
                  <div className='choices'>
                    <img className="confirm" src={confirm} alt="confirm" onClick={() => validateAnswer('Medkit', 2)}/>
                  </div>
                </div>

                 <div className='characterCard'>
                  <img src={sword} alt="sword" />
                  <h3>{phighterStatus[3]}</h3>
                  <div className='choices'>
                    <img className="confirm" src={confirm} alt="confirm" onClick={() => validateAnswer('Sword', 3)}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
    )
}

import coil from "@/assets/characters/coil.png"
import medkit from "@/assets/characters/medkit.png"
import sword from "@/assets/characters/sword.png"
import confirm from "@/assets/icons/check-mark.png"


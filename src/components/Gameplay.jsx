import "@/styles/Gameplay.css";

import { useEffect, useRef, useState } from 'react';
import { useParams } from "react-router";

import { formatTime } from '@/utils/formatTimer';
import { getMapImgByName, getIdByMapName, getPhightersByMapName } from "@/utils/getMap";
import watchClicks from '@/utils/getcoordinate';
import getUrl from '@/utils/getUrl';
import { useTimer } from "../customHooks/useTimer";
import ScoreForm from './ScoreForm';

export default function Gameplay() {
    const [pos, setPos] = useState({x:0, y: 0})
    const [rect, setRect] = useState(null);
    const {countdown, timer, resetTimer} = useTimer();
    
    const mapRef = useRef(null);
    const {mapName} = useParams();
    const currentMap = getMapImgByName(mapName)
    
    //Relevant phighters on map TO DO: save them
    const {phighters} = getPhightersByMapName(mapName)
    const [phighterStatus, setPhighterStatus] = useState(sessionStorage.getItem("phighterStatusSession") ? JSON.parse(sessionStorage.getItem("phighterStatusSession")) : {1: 'Not Found', 2: "Not Found", 3: "Not Found"})
    const winCondition = Object.values(phighterStatus).every((status) => status === 'Found');

    //USE EFFECT FOR SQUARE
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


    useEffect(() => {
      const lastMap = sessionStorage.getItem("prevMap")

      if (lastMap !== mapName) {
        sessionStorage.removeItem("phighterStatusSession");
          const resetGame = () => {
            resetTimer();
            setPhighterStatus({1: 'Not Found', 2: "Not Found", 3: "Not Found"});
          }
          resetGame();
      }
      sessionStorage.setItem("prevMap", mapName)

    }, [mapName, resetTimer]);

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

      const updatedStatus = { ...prev, [index]: newStatus };
      sessionStorage.setItem("phighterStatusSession", JSON.stringify(updatedStatus))
      return updatedStatus
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
                  <img src={phighters[0].img} alt="coil" />
                  <h3>{phighterStatus[1]}</h3>
                  <div className='choices'>                    
                    <img className="confirm" src={confirm} alt="confirm" onClick={() => validateAnswer('Coil', 1)}/>
                    <h2>{phighters[0].name}</h2>
                  </div>
                </div>
                
                 <div className='characterCard'>
                  <img src={phighters[1].img} alt="medkit" />
                  <h3>{phighterStatus[2]}</h3>
                  <div className='choices'>
                    <img className="confirm" src={confirm} alt="confirm" onClick={() => validateAnswer('Medkit', 2)}/>
                    <h2>{phighters[1].name}</h2>
                  </div>
                </div>

                 <div className='characterCard'>
                  <img src={phighters[2].img} alt="sword" />
                  <h3>{phighterStatus[3]}</h3>
                  <div className='choices'>
                    <img className="confirm" src={confirm} alt="confirm" onClick={() => validateAnswer('Sword', 3)}/>
                    <h2>{phighters[2].name}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
    )
}

import confirm from "@/assets/icons/check-mark.png"


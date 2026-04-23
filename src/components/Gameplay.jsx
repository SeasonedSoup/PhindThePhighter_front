import "@/styles/Gameplay.css";

import { useEffect, useRef } from 'react';
import { useParams } from "react-router";

import { formatTime } from '@/utils/formatTimer';
import { getMapImgByName, getIdByMapName, getPhightersByMapName } from "@/utils/getMap";
import getUrl from '@/utils/getUrl';
import { useGameplayTimer } from "../customHooks/useGameplayTimer";
import { usePhighterStatus } from "../customHooks/usePhighterStatus";
import { useTrackerSquare } from "../customHooks/useTrackerSquare";
import ScoreForm from './ScoreForm';

export default function Gameplay() {
    //checks if all phighters are found or not found then timer will adjust accordingly
    const {phighterStatus, resetPhighterStatus, changePhighterStatus} = usePhighterStatus();
    const winCondition = Object.values(phighterStatus).every((status) => status === 'Found');
    const {countdown, timer, resetTimer} = useGameplayTimer(winCondition);

    //for the square to know where the map is located
    const mapRef = useRef(null);
    const {pos, rect} = useTrackerSquare(mapRef);

    //to be used for rendering proper map and chars
    const {mapName} = useParams();  
    const currentMap = getMapImgByName(mapName)
    const {phighters} = getPhightersByMapName(mapName)
    
    //Check if map changed
    useEffect(() => {
      const lastMap = sessionStorage.getItem("prevMap")

      if (lastMap !== mapName) {
          resetTimer();
          resetPhighterStatus();
      }
      sessionStorage.setItem("prevMap", mapName)

    }, [mapName, resetTimer, resetPhighterStatus]);

    
    async function validateAnswer(character, index) {
      const response = await fetch(getUrl(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({character: character, coordinates: pos})
      })
    const result = await response.json()
      changePhighterStatus(result, index)  
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
                <div className='square' style={{ left: pos.x * rect.width + 'px', top: pos.y * rect.height + 'px'}} ></div>
              </div>
            </div>
            <div className="sidebar">
              <h1 className="instructionTitle">PHIND THESE PHIGHTERS!</h1>
              <div className='dropDownMenu'>
                <div className='characters'>
                  {phighters.map((phighter, i) => {
                    return (
                      <div className='characterCard'>
                        <h2 className="phighterName">{phighter.name}</h2>
                        <img src={phighter.img} alt="coil" />
                        <h3 className="status"> {phighterStatus[i]}</h3>
                        <div className='choices'>                    
                          <img className="confirm" src={confirm} alt="confirm" onClick={() => validateAnswer('Coil', 1)}/>
                        </div>
                    </div>
                    )})}
                </div>
              </div>
            </div>
          </div>
    )
}

import confirm from "@/assets/icons/check-mark.png"


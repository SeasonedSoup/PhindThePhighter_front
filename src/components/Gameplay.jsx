import "@/styles/Gameplay.css";

import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams} from "react-router";

import { formatTime } from '@/utils/formatTimer';
import { getMapImgByName, getIdByMapName, getPhightersByMapName } from "@/utils/getMap";
import getUrl from '@/utils/getUrl';
import { useGameplayTimer } from "../customHooks/useGameplayTimer";
import { usePhighterStatus } from "../customHooks/usePhighterStatus";
import { useTrackerSquare } from "../customHooks/useTrackerSquare";
import { useToken } from "../customHooks/useToken";
import { resetSession } from "../utils/sessionHandler";
import giveRandomMusic from "../utils/AudioPlayerRandom";
import ScoreForm from './ScoreForm';

import pauseIcon from "@/assets/icons/pause-button.png";

export default function Gameplay() {
    //pauseState 
    const [paused, setPaused] = useState(false)
    const [track, setTrack] = useState("");
    //navigation
    const navigate = useNavigate();

    //to be used for rendering proper map and chars
    const {mapName} = useParams();  
    const currentMap = getMapImgByName(mapName)
    const {phighters} = getPhightersByMapName(mapName)

    //checks if all phighters are found or not found then timer will adjust accordingly
    const {phighterStatus, resetPhighterStatus, changePhighterStatus} = usePhighterStatus(phighters.length);
    const winCondition = Object.values(phighterStatus).every((status) => status === 'Found');
    const {countdown, timer, resetTimer} = useGameplayTimer(winCondition, paused);

    //for the square to know where the map is located
    const mapRef = useRef(null);
    const {pos, rect} = useTrackerSquare(mapRef);

    //mapId 
    const mapId = getIdByMapName(mapName)

    //token 
    const { token, setToken } = useToken(mapId);

    //music 
    const audioRef = useRef(null);
    useEffect(() => {
      const audio = audioRef.current;
      if (audio) {
        const track = giveRandomMusic();
        audio.src = track.music;
        setTrack(track.name);
        const timer = setTimeout(() => {
          audio.volume = 0.5
          audio.play();
        }, 3000);
        
        return () => {
          clearTimeout(timer);
          audio.pause();
          audio.currentTime = 0;
        };
      }
    }, []);

    useEffect(() => {
      const audio = audioRef.current;
      if (!audio) return;
      
      if (paused) {
        audio.pause();
      } else {
        const timer = setTimeout(() => {
          audio.volume = 0.05
          audio.play();
        }, 3000);
        
        return () => clearTimeout(timer);
      }
    }, [paused]);
    
    //get server score when game ends
    const [serverScore, setServerScore] = useState(() => {
      const stored = sessionStorage.getItem("serverScore");
      return stored !== null ? Number(stored) : null;
    });

    useEffect(() => {
      if (!winCondition || !token ) return;
      const prevMapId = Number(sessionStorage.getItem("prevMapId"));
      const storedScore = sessionStorage.getItem("serverScore");

      if (prevMapId === mapId && storedScore !== null) return;
  
      const setEnd = async () => {
        try {
          console.log("FETCHING GAME END")
          const response = await fetch(getUrl() + '/gameEnd', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
        });

            const result = await response.json();

            setToken(result.token);
            sessionStorage.setItem("token", result.token);

            setServerScore(result.score);
            sessionStorage.setItem("serverScore", result.score);
             sessionStorage.setItem("prevMapId", mapId);

          } catch (err) {
            console.error(err);
          }
        };
    
    setEnd();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winCondition]);
      
    

    //Check if map changed
    useEffect(() => {
      const lastMap = sessionStorage.getItem("prevMap")

      if (lastMap !== mapName) {
          resetTimer();
          resetSession();
          resetPhighterStatus();
      }
      sessionStorage.setItem("prevMap", mapName)

    }, [mapName, resetTimer, resetPhighterStatus, setToken]);

    
    async function validateAnswer(character, index) {
      const response = await fetch(getUrl(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({character: character, coordinates: pos})
      })
    const result = await response.json()
      setToken(result.token)
      sessionStorage.setItem("token", result.token);
      changePhighterStatus(result, index)  
    }

    function navigateToMaps() {
      resetSession();
      navigate(`/maps`)
    }
  

    return (
          <div className='screen'>
            {countdown > 0 && 
            <div className='modal'>
              <div className='modal-content'>
                Game is about to start in: {countdown}
              </div>
            </div> }
            {paused === true &&
              <div className='modal exit'>
                <div className='modal-content'>
                  <h3>Game Paused</h3>
                  <h3>Current Time : {formatTime(timer)}</h3>
                  <button onClick={() => setPaused(false)} >Continue</button>
                  <button onClick={() => navigateToMaps()}>Quit</button>
                </div>
              </div>
            }
            { winCondition === true && <ScoreForm score={timer} serverScore={serverScore} mapId={getIdByMapName(mapName)} mapName={mapName} token={token} setToken={setToken}/> }
            <div className='stats'>
              <img className="menuBtn" src={pauseIcon} alt="menu" onClick={() => setPaused(true)} />
            </div>
            <div className='gameScreen'>
              <div className="gameplayAudio">
                <h2>{track}</h2>
                <audio ref={audioRef} loop controls></audio>
              </div>
        
              <div className='map' ref={mapRef}>
                <img draggable="false" src={currentMap} alt="selected map" />
                <div className='square' style={{ left: pos.x * rect.width + 'px', top: pos.y * rect.height + 'px'}} ></div>
              </div>
              <h1 className="timer"> {formatTime(timer)} </h1>
              <h1 className="position">
                  X: {rect ? (pos.x * 100).toFixed(1) : 0},

                 Y: {rect ? (pos.y * 100).toFixed(1) : 0}
              </h1>
            </div>
            <div className="sidebar">
              <h1 className="instructionTitle">PHIND THESE PHIGHTERS!</h1>
              <div className='dropDownMenu'>
                <div className='characters'>
                  {phighters.map((phighter, i) => {
                    return (
                      <div className='characterCard' key={phighter.name}>
                        <h2 className="phighterName">{phighter.name}</h2>
                        <img src={phighter.img} alt="coil" />
                        <h3 className="status"> {phighterStatus[i]}</h3>
                        <button className="findBtn" onClick={() => validateAnswer(phighter.name, i)}>Find</button>
                        <div className='choices'>                    
                          {phighterStatus[i] === 'Found' ? <img className="check"  key="found" src={found} alt="check Icon" /> : <img className="wrong"  key="notFound" src={notFound} alt="X Icon"/> }
                        </div>
                    </div>
                    )})}
                </div>
              </div>
            </div>
          </div>
    )
}

import found from "@/assets/icons/check-mark.png"
import notFound from "@/assets/icons/X.png"

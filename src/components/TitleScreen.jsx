import "@/styles/TitleScreen.css"
import { useNavigate } from "react-router";
import { useState, useRef, useEffect } from "react";
import ost from '../assets/betterCrablooshi.mp3'
import hoverSound from "../assets/hoverSound.ogg"
import clickSound from "../assets/clickSound.ogg"
import { Credits } from "./Credits";

function TitleScreen() {
    const navigate = useNavigate();
    const audioHoverRef = useRef(null);
    const audioClickRef = useRef(null);
    const bgRef = useRef(null);

    useEffect(() => {
        const audio = bgRef.current;

        const savedTime = sessionStorage.getItem("audio-time")

        if (savedTime) audio.currentTime = parseFloat(savedTime) 
            
        const saveTime = () => {
            sessionStorage.setItem('audio-time', audio.currentTime);
        }
        audio.addEventListener("timeupdate", saveTime)

        return () => audio.removeEventListener("timeupdate", saveTime)
    }, [])
    const [hasInteracted, setHasInteracted] = useState(false); 

    const [viewCredits, setViewCredits] = useState(false)
    function navigateToMapChoices() {
        navigate('/maps')
    }

    function navigateToArtworks() {
        navigate('/artworks')
    }

    function showCredits() {
    setHasInteracted(true); 
    setViewCredits(true);
    }

    function removeCredits() {
        setViewCredits(false);
    }

    function hoverPlay() {
        if (audioHoverRef.current) {
            audioHoverRef.current.currentTime = 0; 
            audioHoverRef.current.play();
        }
    }

    function clickPlay() {
    if (audioClickRef.current) {
            audioClickRef.current.currentTime = 0; 
            audioClickRef.current.play();
        }
    }

    return (
        <div className="container">
            {viewCredits && <button onClick={() => removeCredits()} className="exitCredits">Exit</button>}
            <div className={`btns ${viewCredits ? 'getOutLeft' : 'goBackLeft'}`} >
                <button className="titleBtn" onClick={() => {clickPlay(); navigateToMapChoices()}} onMouseEnter={hoverPlay} >Choose Map</button>
                <button className="titleBtn" onClick={() => {clickPlay(); showCredits()}} onMouseEnter={hoverPlay} > Credits</button>
                <button className="titleBtn" onClick={navigateToArtworks} onMouseEnter={hoverPlay}>Artworks</button>
            </div>
            <div className={`titleContainer ${ viewCredits ? 'getOutRight' : 'goBackRight'}`}>
                <h1 className="title"> Phind The <br/> Phighter!</h1>
                <div className="soundTrack">
                    <h3>"PHIGHT!" by: CRABLOOSHI</h3>
                    <audio controls autoPlay loop ref={bgRef}>
                    <source src={ost} type="audio/mpeg"/>
                    </audio>
                </div>
            </div>
            <div className={`creditContainer ${!hasInteracted ? '' : viewCredits ? 'show' : 'exit'}`} >
                 <Credits></Credits>
            </div>
            
            <audio id="myAudio"  ref={audioHoverRef}>
                <source src={hoverSound} type="audio/ogg"/>
            </audio>
             <audio id="myAudio"  ref={audioClickRef}>
                <source src={clickSound} type="audio/ogg"/>
            </audio>
          
        </div>
    )
}

export default TitleScreen;
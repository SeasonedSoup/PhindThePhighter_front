import "@/styles/TitleScreen.css"
import { useNavigate } from "react-router";
import { useState, useRef } from "react";
import ost from '../assets/betterCrablooshi.mp3'
import hoverSound from "../assets/hoverSound.ogg"
import clickSound from "../assets/clickSound.ogg"
import { Credits } from "./Credits";

function TitleScreen() {
    const navigate = useNavigate();
    const audioHoverRef = useRef(null);
    const audioClickRef = useRef(null);
    const [hasInteracted, setHasInteracted] = useState(false); 

    const [viewCredits, setViewCredits] = useState(false)
    function navigateToMapChoices() {
        navigate('/maps')
    }

    function navigateToArtworks() {
        navigate('/artworks')
    }

    function showCredits() {
    setHasInteracted(true); // Now we know the user clicked
    setViewCredits(true);
    }

    function removeCredits() {
        setViewCredits(false);
    }

    function hoverPlay() {
        if (audioHoverRef.current) {
            audioHoverRef.current.currentTime = 0; // Rewind to start
            audioHoverRef.current.play();
        }
    }

    function clickPlay() {
    if (audioClickRef.current) {
            audioClickRef.current.currentTime = 0; // Rewind to start
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
                    <audio controls autoPlay loop muted>
                    <source src={ost} type="audio/mpeg"/>
                    </audio>
                </div>
            </div>
            <div className={`creditContainer ${!hasInteracted ? '' : viewCredits ? 'show' : 'exit'}`} >
                 <Credits></Credits>
            </div>
            
            <audio id="myAudio" hidden="true" ref={audioHoverRef}>
                <source src={hoverSound} type="audio/ogg"/>
            </audio>
             <audio id="myAudio" hidden="true" ref={audioClickRef}>
                <source src={clickSound} type="audio/ogg"/>
            </audio>
          
        </div>
    )
}

export default TitleScreen;
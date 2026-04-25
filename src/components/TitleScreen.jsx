import "@/styles/TitleScreen.css"
import { useNavigate } from "react-router";
import { useState } from "react";
import ost from '../assets/betterCrablooshi.mp3'
import { Credits } from "./Credits";

function TitleScreen() {
    const navigate = useNavigate();
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

    return (
        <div className="container">
            {viewCredits && <button onClick={() => removeCredits()} className="exitCredits">Exit</button>}
            <div className={`btns ${viewCredits ? 'getOutLeft' : 'goBackLeft'}`} >
                <button className="titleBtn" onClick={navigateToMapChoices}>Choose Map</button>
                <button className="titleBtn" onClick={() => showCredits()}>Credits</button>
                <button className="titleBtn" onClick={navigateToArtworks}>Artworks</button>
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
            
          
        </div>
    )
}

export default TitleScreen;
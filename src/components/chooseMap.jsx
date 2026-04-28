import Skatepark from "@/assets/maps/BogioSkateparkSquare.png"
import Museum from "@/assets/maps/RobloxMuseum.png"
import CraterDust from "@/assets/maps/CraterdustCapital.png"
import "@/styles/chooseMap.css";
import lobbyMusic from "@/assets/peakLobby.mp3"
import { useRef } from "react";
import { useNavigate } from "react-router";
import mapHover from "@/assets/mapHover.ogg";

function ChooseMap() {
    const navigate = useNavigate()
    const audioHoverRef = useRef(null);
    const lobbyMusicRef = useRef(null);

    function viewMapInfo(mapName) {
        navigate(`/mapInfo/${mapName}`);
    }
    function hoverPlay() {
        if (audioHoverRef.current) {
            audioHoverRef.current.currentTime = 0; 
            audioHoverRef.current.play();
        }
    }
    function navigateToTitle() {
        navigate('/')
    }

    function setAudio() {
        const audio = lobbyMusicRef.current;
        audio.volume = 0.05;
    }

    return (
        <div className="layout">
            <button onClick={navigateToTitle}>Go back</button>
            <h1 className="heroText">Choose A Map</h1>

            <div className="images">
                <div className="mapChoice" id="one"onClick={() => viewMapInfo("Bogio-Skatepark")} onMouseEnter={hoverPlay}>
                        <img src={Skatepark} alt="skatepark" />
                        <h3 className="mapName">Bogio Skatepark</h3>
                </div>
                
                <div className="mapChoice" id="two" onClick={() => viewMapInfo("Roblox-Museum")} onMouseEnter={hoverPlay}>
                    <img src={Museum} alt="museum" />
                    <h3 className="mapName" >Roblox Museum</h3>
                </div>

                <div className="mapChoice" id="three" onClick={() => viewMapInfo("Craterdust-Capital")} onMouseEnter={hoverPlay}>
                    <img src={CraterDust} alt="a crazy city" />
                    <h3 className="mapName">Craterdust Capital</h3>
                </div>
            </div>
            <audio className="lobbyMusic"src={lobbyMusic} ref={lobbyMusicRef} autoPlay loop controls ></audio>

            <audio ref={audioHoverRef} onLoadedData={setAudio}>
                  <source src={mapHover} type="audio/ogg"/>
            </audio>
        </div>
    )
}

export default ChooseMap;


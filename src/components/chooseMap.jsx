import Skatepark from "@/assets/maps/BogioSkateparkSquare.png"
import Museum from "@/assets/maps/RobloxMuseum.png"
import CraterDust from "@/assets/maps/CraterdustCapital.png"
import SkateparkLevel from "@/assets/maps/BogioSPS_Map.png"

import "@/styles/chooseMap.css";

import { useNavigate } from "react-router";
function ChooseMap() {
    const navigate = useNavigate()

    function startGame(mapName) {
        navigate(`/game/${mapName}`, {state: SkateparkLevel});
    }

    return (
        <div className="layout">
            <h1>Choose A Map</h1>

            <div className="images">
                <div className="mapChoice" onClick={() => startGame("Boggio-Skatepark")}>
                    <img src={Skatepark} alt="skatepark" />
                    <a>Boggio Skatepark</a>
                </div>
                
                <div className="mapChoice">
                    <img src={Museum} alt="museum" />
                    <a>Roblox Museum</a>
                </div>

                <div className="mapChoice">
                    <img src={CraterDust} alt="a crazy city" />
                    <a>Craterdust Capital</a>
                </div>
            </div>
        </div>
    )
}

export default ChooseMap;


import Skatepark from "@/assets/maps/BogioSkateparkSquare.png"
import Museum from "@/assets/maps/RobloxMuseum.png"
import CraterDust from "@/assets/maps/CraterdustCapital.png"

import "@/styles/chooseMap.css";

import { useNavigate } from "react-router";
function ChooseMap() {
    const navigate = useNavigate()

    function viewMapInfo(mapName, mapId) {
        navigate(`/mapInfo/${mapName}`, {state: {id: mapId}});
    }


    return (
        <div className="layout">
            <h1>Choose A Map</h1>

            <div className="images">
                <div className="mapChoice" onClick={() => viewMapInfo("Boggio-Skatepark", 1)}>
                    <img src={Skatepark} alt="skatepark" />
                    <a>Boggio Skatepark</a>
                </div>
                
                <div className="mapChoice" onClick={() => viewMapInfo("Roblox-Museum", 2)}>
                    <img src={Museum} alt="museum" />
                    <a>Roblox Museum</a>
                </div>

                <div className="mapChoice" onClick={() => viewMapInfo("Craterdust-Capital", 3)}>
                    <img src={CraterDust} alt="a crazy city" />
                    <a>Craterdust Capital</a>
                </div>
            </div>
        </div>
    )
}

export default ChooseMap;


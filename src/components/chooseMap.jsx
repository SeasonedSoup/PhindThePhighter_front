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

    function navigateToTitle() {
        navigate('/')
    }

    return (
        <div className="layout">
            <button onClick={navigateToTitle}>Go back</button>
            <h1 className="heroText">Choose A Map</h1>

            <div className="images">
                <div className="mapChoice" id="one"onClick={() => viewMapInfo("Bogio-Skatepark", 1)}>
                    <img src={Skatepark} alt="skatepark" />
                    <h3 className="mapName">Bogio Skatepark</h3>
                </div>
                
                <div className="mapChoice" id="two" onClick={() => viewMapInfo("Roblox-Museum", 2)}>
                    <img src={Museum} alt="museum" />
                    <h3 className="mapName" >Roblox Museum</h3>
                </div>

                <div className="mapChoice" id="three" onClick={() => viewMapInfo("Craterdust-Capital", 3)}>
                    <img src={CraterDust} alt="a crazy city" />
                    <h3 className="mapName">Craterdust Capital</h3>
                </div>
            </div>
        </div>
    )
}

export default ChooseMap;


import SkateparkPrvw from "@/assets/maps/BogioSkateparkSquare.png"
import MuseumPrvw from "@/assets/maps/RobloxMuseum.png"
import CraterDustPrvw from "@/assets/maps/CraterdustCapital.png"

//img based on id i think this isnt used anymore
export function getMap(id) {
    switch (id){
        case 1:
            return SkateparkPrvw
        case 2: 
            return MuseumPrvw
        case 3: 
            return CraterDustPrvw
    }
}

//get mapImg based on mapname
import Skatepark from "../assets/maps/BogioSPS_Map.png"
import Museum from "../assets/maps/RobloxMuseum_Map.png"
import CraterDust from "../assets/maps/CraterdustCapital_Map.png"


const mapNames = {
    "Bogio-Skatepark" : Skatepark ,
    "Roblox-Museum": Museum,
    "Craterdust-Capital" : CraterDust
}

export function getMapImgByName(mapName) {
    return mapNames[mapName];
}

//get id by mapname

const ids = {
    "Bogio-Skatepark" : 1 ,
    "Roblox-Museum": 2,
    "Craterdust-Capital" : 3
}
export function getIdByMapName(mapName) {
    return ids[mapName];
}


//Characters

import Coil from "../assets/characters/coil.png"
import Medkit from "../assets/characters/medkit.png"
import Sword from "../assets/characters/sword.png"
import Katana from "../assets/characters/katana.png"
import Biograft from "../assets/characters/biograft.png"
import Shuriken from "../assets/characters/shuriken.png"
import Vinestaff from "../assets/characters/vinestaff.png"
import Skateboard from "../assets/characters/Render_Skateboard.png"
import BanHammer from "../assets/characters/Render_Ban_Hammer.png"
import Subspace from "../assets/characters/Render_Subspace.png"
import Valk from "../assets/characters/render_valk.png"
import Rocket from "../assets/characters/Render_Rocket.png"
const mapPhighters = {
    "Bogio-Skatepark" : {"phighters" : [{"name": "Coil", "img": Coil}, {"name" : "Medkit", "img": Medkit} , {"name": "Sword", "img": Sword}]},
    "Roblox-Museum" : {"phighters" : [{"name" :"Katana", "img": Katana}, {"name": "Biograft", "img": Biograft }, {"name":"Shuriken", "img": Shuriken}, {"name": "Vinestaff", "img": Vinestaff}]},
    "Craterdust-Capital" : {"phighters" : [{"name":"Skateboard", "img": Skateboard}, {"name":"BanHammer", "img": BanHammer} , {"name": "Subspace", "img": Subspace}
        , {"name": "Valk", "img": Valk}, {"name": "Rocket", "img": Rocket}
    ]}
}

export function getPhightersByMapName(mapName) {
    return mapPhighters[mapName];
}
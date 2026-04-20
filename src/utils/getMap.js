import SkateparkPrvw from "@/assets/maps/BogioSkateparkSquare.png"
import MuseumPrvw from "@/assets/maps/RobloxMuseum.png"
import CraterDustPrvw from "@/assets/maps/CraterdustCapital.png"

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

import Skatepark from "../assets/maps/BogioSPS_Map.png"
import Museum from "../assets/maps/RobloxMuseum_Map.png"
import CraterDust from "../assets/maps/CraterdustCapital_Map.png"


const mapNames = {
    "Bogio-Skatepark" : Skatepark ,
    "Roblox-Museum": Museum,
    "Craterdust-Capital" : CraterDust
}

export function getMapByName(mapname) {
    return mapNames[mapname];
}
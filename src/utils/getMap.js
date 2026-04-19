import Skatepark from "@/assets/maps/BogioSkateparkSquare.png"
import Museum from "@/assets/maps/RobloxMuseum.png"
import CraterDust from "@/assets/maps/CraterdustCapital.png"

export default function getMap(id) {
    switch (id){
        case 1:
            return Skatepark
        case 2: 
            return Museum
        case 3: 
            return CraterDust
    }
}
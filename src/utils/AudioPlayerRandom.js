import overTime from "@/assets/overtime.mp3";
import pandemonium from "@/assets/pandemonium.mp3"
import rushhour from "@/assets/rushhour.mp3"
import photonphaser from "@/assets/photonphaser.mp3"
import theflipside from "@/assets/theflipside.mp3"

function giveRandomMusic() {
    const musicTracks = [
        { music: overTime, name: "Over Time" },
        { music: pandemonium, name: "Pandemonium" },
        { music: rushhour, name: "Rush Hour" },
        { music: photonphaser, name: "Photon Phaser" },
        { music: theflipside, name: "The Flipside" }
    ]

    return musicTracks[Math.floor(Math.random() * musicTracks.length)]
}

export default giveRandomMusic;
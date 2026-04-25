import "@/styles/TitleScreen.css"
import { useNavigate } from "react-router";
import ost from '../assets/betterCrablooshi.mp3'
function TitleScreen() {
    const navigate = useNavigate();

    function navigateToMapChoices() {
        navigate('/maps')
    }

    function navigateToArtworks() {
        navigate('/artworks')
    }

    return (
        <div className="container">
            <div className="btns">
                <button className="titleBtn" onClick={navigateToMapChoices}>Choose Map</button>
                <button className="titleBtn" >Credits</button>
                <button className="titleBtn" onClick={navigateToArtworks}>Artworks</button>
            </div>
            <div className="titleContainer">
                <h1 className="title"> Phind The <br/> Phighter!</h1>
                <div className="soundTrack">
                    <h3>"PHIGHT!" by: CRABLOOSHI</h3>
                    <audio controls autoPlay loop muted>
                    <source src={ost} type="audio/mpeg"/>
                    </audio>
                </div>
               
            </div>
            
          
        </div>
    )
}

export default TitleScreen;
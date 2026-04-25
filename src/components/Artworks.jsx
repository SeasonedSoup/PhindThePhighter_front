import "@/styles/artWorks.css"
import {useNavigate} from "react-router";

export default function Artworks() {
    const navigate = useNavigate();
    function navigateToTitle() {
        navigate('/title')
    }

    return (
        <div className="artWorkScreen">
            <button className="btn" onClick={navigateToTitle}>Go back</button>
            <h1 className="heroText">My Artworks</h1>
            <div className="artWorkImages">
                <div className="imageContainer">
                    <img src="/skateboard.jpeg" className="artWorkImg skate" alt="" />
                    <h1>Skateboard</h1>
                </div>
                <div className="imageContainer">
                    <img src="/coil.jpeg" alt="" className="artWorkImg coil" />
                    <h1>Coil</h1>
                </div>
                <div className="imageContainer">
                    <img src="/slingshot.jpeg" alt="" className="artWorkImg sling"/>
                    <h1>Slingshot</h1>
                </div>
            </div>
        </div>
    )
}
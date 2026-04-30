import "@/styles/artWorks.css"
import {useNavigate} from "react-router";
import { useRef, useState } from "react";
import skateArt from "/skateboard.jpeg"
import coilArt from "/coil.jpeg"
import slingArt from "/slingshot.jpeg"
export default function Artworks() {
    const [activeImg, setActiveImg] = useState(null);
    const modalRef = useRef(null);
    const navigate = useNavigate();
    function navigateToTitle() {
        navigate('/title')
    }

    function viewPhoto(num) {
        switch (num) {
            case 1: 
                 setActiveImg(skateArt)
                break
            case 2:
                setActiveImg(coilArt)
                break
            case 3:
                setActiveImg(slingArt)
                break
            default:
                setActiveImg(null)
                modalRef.current.style.visibility = "hidden";
                return;
        }
             modalRef.current.style.visibility = "visible";
    }

    return (
        <div className="artWorkScreen">
            <div hidden className="artBackDrop" ref={modalRef}>
                <div className="artModal">
                    <button className="exitImg" onClick={() => viewPhoto()}>X</button>
                    <img src={activeImg} />
                </div>
            </div>
            <button className="btn" onClick={navigateToTitle}>Go back</button>
            <h1 className="heroText">My Artworks</h1>
            <div className="artWorkImages">
                <div className="imageContainer">
                    <img src={skateArt} className="artWorkImg skate" alt=""  onClick={() => viewPhoto(1)}/>
                    <h1>Skateboard</h1>
                </div>
                <div className="imageContainer">
                    <img src={coilArt} alt="" className="artWorkImg coil" onClick={() =>viewPhoto(2)}/>
                    <h1>Coil</h1>
                </div>
                <div className="imageContainer">
                    <img src={slingArt} alt="" className="artWorkImg sling" onClick={() => viewPhoto(3)}/>
                    <h1>Slingshot</h1>
                </div>
            </div>
        </div>
    )
}
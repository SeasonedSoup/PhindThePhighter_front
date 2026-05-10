//contains the images of phighters and of which to click 
import "@/styles/Gameplay.css";

export default function DropDown({phighters, validateAnswer, pos, rect}) {
    return (
        <div className="dropdown">
            <div className='phighterBox' style={{  left: pos.x * rect.width + 'px', top: pos.y * rect.height + 100 + 'px'}}>
                {phighters.map((phighter, i) => {
                    return (
                        <img key={phighter.name} className="phighterImg" src={phighter.img} alt="coil" onClick={() => validateAnswer(phighter.name, i)}/>
                )})}
             </div>
        </div>
    )
}
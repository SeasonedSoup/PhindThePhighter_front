import { useNavigate } from "react-router";

export function Intro() {
    const navigate = useNavigate();

    function handleStart() {
        document.documentElement.classList.add('intro-to-title');

        
        const transition = document.startViewTransition(() => {
            navigate('/title'); 
        });

        transition.finished.finally(() => {
            document.documentElement.classList.remove('intro-to-title');
        });
    }

    return (
        <div className="intro-container">
            <h1>Made by @Seasoned-Soup</h1>
            <h1>Audio Warning!</h1>
            <button onClick={handleStart}>Click this button to start!</button>
        </div>
    )
}
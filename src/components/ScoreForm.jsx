import { formatTime } from "@/utils/formatTimer"
import getUrl from "@/utils/getUrl"
import '@/styles/ScoreForm.css'
import {useNavigate} from 'react-router'
import { useState } from "react";
import { resetSession } from "../utils/sessionHandler";

export default function ScoreForm({score, serverScore, mapId, mapName, token, setToken}) {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    async function createHighScore(name) {
        try {
            const response = await fetch(getUrl() + '/create', {
                method: 'POST',
                headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({name: name, mapId: mapId})
            }) 

            if (response.ok) {
                const result = await response.json();
                console.log("Success:", result.message);
                setSubmitting(false);
                resetSession(setToken);
                navigate('/');
                } 
        } catch (err) {
            console.error("Try again. Submission failed:", err);
        } finally {
            resetSession(setToken) 
            setSubmitting(false);
        }
    }

    async function submitScore(e) {
        e.preventDefault();

        const name = e.target.name.value
        if (!name.trim() || submitting) return;
        
        setSubmitting(true)
        await createHighScore(name);
    }
    
    return (
        <div className="scoreForm">
            <form action="/create" className="scoreFormContent" onSubmit={submitScore}>
            <h4>Nice! You beat {mapName}</h4>
            <label htmlFor="name">What's your name?</label>
            <input type="text" id="name" name="name"/>
            <div className="timers">
                <h2>Time taken (Client): {formatTime(score)}</h2>
                <h2>Time taken (Server): {formatTime(serverScore)}</h2>
            </div>
            
            <button className="button" disabled={submitting}>
                Enter
            </button>
            </form>
        </div>
    )
}
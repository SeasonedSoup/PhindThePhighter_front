import { formatTime } from "@/utils/formatTimer"
import getUrl from "@/utils/getUrl"
import '@/styles/ScoreForm.css'
import {useNavigate} from 'react-router'
import { useState } from "react";
export default function ScoreForm({score}) {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    async function createHighScore(name) {

      const response = await fetch(getUrl() + '/create', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({name: name, score: score})
      }) 

        if (response.ok) {
            const result = await response.json();
            console.log("Success:", result.message);
            setSubmitting(false)
            navigate('/');
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
            <label htmlFor="name">What's your name?</label>
            <input type="text" id="name" name="name"/>
            <h2>Time taken: {formatTime(score)}</h2>
            <button disabled={submitting}>
                Enter
            </button>
            </form>
        </div>
    )
}
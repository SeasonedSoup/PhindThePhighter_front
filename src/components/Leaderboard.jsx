import { useEffect, useState } from "react";

import getUrl from "../utils/getUrl";
import { useNavigate, useParams } from "react-router";
import { getIdByMapName } from "../utils/getMap";
import { formatTime } from "../utils/formatTimer";

import '@/styles/Leaderboard.css'
export  function Leaderboard() {
    const [users, setUsers] = useState([]);
    const {mapName} = useParams();
    const mapId = getIdByMapName(mapName);
    const navigate = useNavigate();
    console.log(mapId)
    useEffect(() => {
        async function fetchAll() {
        const response = await fetch(getUrl() + `/leaderboard/${mapId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
            })
        
            if (!response.ok) {
                const error = await response.json()
                console.error(error);
            }
        
        const result = await response.json()
                console.log(result);
                setUsers(result);
    }

    fetchAll();
    }, [mapId])

    function navigateBack() {
        navigate(`/mapInfo/${mapName}`)
    }

    return (
        <div className="lbScreen">
            <button onClick={navigateBack}>Go back</button>
            <h1>{mapName.split("-").join(" ")} LEADERBOARD:</h1>

                <div className="">
                {
                     users.length > 0 ? users.map((user, i) => {
                    return <h1 key="user.name">{i+1}. {user.name}, {formatTime(user.timeTakenMs)}</h1>
                }) : <h1>Currently No One in the Leaderboard Be The first!</h1>
                }
                </div>
        </div>
    )
}
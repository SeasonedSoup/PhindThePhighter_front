import getUrl from '../utils/getUrl'
import { useEffect, useState } from 'react';
import { formatTime } from '../utils/formatTimer';
function PreviewMap() {
    const [topPlayers, setTopPlayers] = useState([]);

    useEffect(() => {
         async function fetchTopTenPlayers() {
            const response = await fetch(getUrl() + '/1/mapInfo', {
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
            setTopPlayers(result)
        }

        fetchTopTenPlayers();
    }, [])

    
    return (
        <div>
            <h1>Map name: Boggio Skatepark</h1>
            <img src={map} alt="test map" style={{ height: "200px", width: "200px" }}/>

            <h1>Leaderboard</h1>
            {topPlayers.map((player) => {
                return (
                    <div key={player.id}>
                        <h1>{player.name} {formatTime(player.timeTakenMs)}</h1>
                    </div>
                )
            })}
        </div>
    )
}

export default PreviewMap;

import map from "@/assets/maps/BogioSkateparkSquare.png"
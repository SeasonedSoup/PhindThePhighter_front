import getUrl from '../utils/getUrl'
import { useEffect, useState } from 'react';
import {useLocation, useNavigate, useParams} from 'react-router';
import { formatTime } from '../utils/formatTimer';
import {getMap} from '../utils/getMap';

import "@/styles/previewMap.css"
function PreviewMap() {
    const [topPlayers, setTopPlayers] = useState([]);
    const navigate = useNavigate();
    const {mapName} = useParams();
    const location = useLocation();
    
    useEffect(() => {
         async function fetchTopTenPlayers() {
            console.log(location.state.id)
            const response = await fetch(getUrl() + `/${location.state.id}/mapInfo`, {
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
    }, [location.state.id])

    function startGame() {
        navigate(`/game/${mapName}`);
    }

    
    return (
        <div className='previewMapLayout'>
            <div className='mapPreview'>
                <h1>Map name: {mapName.split("-").join(" ")}</h1>
                <img src={getMap(location.state.id)}/>
                <button onClick={startGame}>Play Map</button>
            </div>

            <div className='topTenLb'>
                <h1 className='lbTitle'>Top 10 Leaderboard</h1>
                {topPlayers.length > 0 ? topPlayers.map((player, i) => {
                return (
                    <div className='player' key={player.id}>
                        <div className="name">
                            <h1> {i + 1}. {player.name}</h1>
                        </div>
                        <div>
                         <div className="timeTaken">
                            <h1> {formatTime(player.timeTakenMs)}</h1>
                        </div>
                        </div>
                    </div>
                )
                }) : <h1 className='emptyLb'>CURRENTLY NOONE IN THE LEADERBOARD BE THE FIRST!</h1>}
                <button className='visitLb'>Visit Leaderboard</button>
            </div>
        </div>
    )
}

export default PreviewMap;
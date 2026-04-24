import getUrl from '../utils/getUrl'
import { useEffect, useState } from 'react';
import { useNavigate, useParams} from 'react-router';
import { formatTime } from '../utils/formatTimer';
import {getMap, getIdByMapName} from '../utils/getMap';

import "@/styles/previewMap.css"
function PreviewMap() {
    const [topPlayers, setTopPlayers] = useState([]);
    const navigate = useNavigate();
    const {mapName} = useParams();
    const mapId = getIdByMapName(mapName);
    
    useEffect(() => {
         async function fetchTopTenPlayers() {
            console.log(mapId)
            const response = await fetch(getUrl() + `/${mapId}/mapInfo`, {
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
    }, [mapId])

    function startGame() {
        navigate(`/game/${mapName}`);
    }

    function visitLeaderboard() {
        navigate(`/leaderboard/${mapName}`);
    }

    
    return (
        <div className='previewMapLayout'>
            <div className='mapPreview'>
                <div className='mapTitle'>
                    <h1>{mapName.split("-").join(" ")}</h1>
                </div>
                <img src={getMap(mapId)}/>
                <button className='playBtn' onClick={startGame}>Play Map</button>
            </div>

            <div className='topTenLb'>
               
                    { topPlayers.length > 0 ? (
                    <div className='lbBackground'>
                        <h1 className='lbTitle'>Top 10 Leaderboard</h1>
                        { topPlayers.map((player, i) => {
                        return (
                            <div className='player' key={player.id}>
                                <div className="name">
                                    <h1> {i + 1}. {player.name}</h1>
                                </div>
                                 <div className="timeTaken">
                                <h1> {formatTime(player.timeTakenMs)}</h1>
                                </div>
                            </div>
                            );
                        })}
                        <button className='visitLbBtn'onClick={visitLeaderboard}> Visit Leaderboard </button>
                    </div>
                    
                    ) : ( <div className='lbBackground'>
                            <h1 className='emptyLb'>There are currently no top 10 players. Be the first!</h1>
                            <button className='visitLbBtn' onClick={visitLeaderboard} >Visit Leaderboard</button>
                        </div>)
                    }
            </div>
        </div>
    )
}

export default PreviewMap;
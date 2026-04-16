function PreviewMap() {
    function fetchTopTenPlayers() {

    }
    return (
        <div>
            <h1>Map name: Boggio Skatepark</h1>
            <img src={map} alt="test map" style={{ height: "200px", width: "200px" }}/>

            <h1>Leaderboard</h1>
            <h2>1. SEASONED SOUP 1000 million seconds</h2>
            <h2>2. BALLS 1000000 million seconds</h2>
        </div>
    )
}

export default PreviewMap;

import map from "@/assets/maps/BogioSkateparkSquare.png"
import "@/styles/TitleScreen.css"

function TitleScreen() {
    return (
        <div className="container">
            <div className="btns">
                <a className="titleBtn" href="maps">Choose Map</a>
                <a className="titleBtn"href="credits">Credits</a>
                <a className="titleBtn" href="art">Artworks</a>
            </div>
            <div className="titleContainer">
                <h1 className="title"> Phind The <br/> Phighter!</h1>
            </div>
        </div>
    )
}

export default TitleScreen;
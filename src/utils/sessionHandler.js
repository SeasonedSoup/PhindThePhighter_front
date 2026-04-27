export function resetSession() {
    sessionStorage.setItem("seconds", 0)
    sessionStorage.setItem("cdFinished" , false);
    sessionStorage.removeItem("phighterStatusSession");
    sessionStorage.setItem('gameEnded', "false");
    sessionStorage.removeItem('prevMapId');
    sessionStorage.removeItem('token');
}


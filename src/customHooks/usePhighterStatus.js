import { useState } from "react"

export function usePhighterStatus() {
    //Status of phighters when gameplay starts
    const initialStatus = {0: 'Not Found', 1: "Not Found", 2: "Not Found"};

    const [phighterStatus, setPhighterStatus] = useState (
    sessionStorage.getItem("phighterStatusSession") ? JSON.parse(sessionStorage.getItem("phighterStatusSession")) : initialStatus
    );

    const changePhighterStatus = (result, index) => {
        setPhighterStatus((prev) => {
            const currentStatus = prev[index];
            const newStatus = currentStatus === 'Found' ? 'Found' : result.status;

            const updatedStatus = { ...prev, [index]: newStatus };
            sessionStorage.setItem("phighterStatusSession", JSON.stringify(updatedStatus));
        
            return updatedStatus;
        })
    }
    const resetPhighterStatus = () => {
        sessionStorage.removeItem("phighterStatusSession");
        setPhighterStatus(initialStatus);
    }

    return {phighterStatus, resetPhighterStatus, changePhighterStatus};
}

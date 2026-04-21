import { useState, useEffect } from "react";
const initialCountdown = 3

export function useTimer() {
    const [countdown, setCountdown] = useState(sessionStorage.getItem("cdFinished") === "true" ? 0 : initialCountdown);
    const [timer, setTimer] = useState(() => sessionStorage.getItem("seconds") ? JSON.parse(sessionStorage.getItem("seconds")): 0);
    
    const resetTimer = () => {
        sessionStorage.removeItem("seconds");
        sessionStorage.removeItem("cdFinished");
        setCountdown(initialCountdown);
        setTimer(0);
    };

    useEffect(() => {
        if (countdown <= 0) return;
    
        const countdownId = setInterval(() => {
            setCountdown((prev) => Math.max(0, prev - 1));
        }, 1000)
    
        return () => clearInterval(countdownId);
    }, [countdown])
    
    useEffect(() => {
        if (countdown > 0 ) return;
          
        const timerId = setInterval(() => {
        setTimer((prev) => {
            const next = prev + 10
            sessionStorage.setItem("seconds", JSON.stringify(next));
            return next;
        });
        }, 10)  
        return () => clearInterval(timerId);
    }, [countdown])
    
    useEffect(() => {
        if (countdown == 0) {
            sessionStorage.setItem("cdFinished",true);
        }
    }, [countdown])
        
    useEffect(() => {
        sessionStorage.setItem("seconds", timer);
    }, [timer])
    

    return {countdown, timer, resetTimer};
}
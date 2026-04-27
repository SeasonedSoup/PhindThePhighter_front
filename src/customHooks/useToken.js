import getUrl from '@/utils/getUrl.js';
import { useState, useEffect } from 'react';

export function useToken(mapId) {
    const [token, setToken] = useState(() => {
        if (Number(sessionStorage.getItem("prevMapId")) !== mapId ) {
            return null
        }  else {
            return sessionStorage.getItem("token")
        }
    });


    useEffect(() => {
        if (!mapId || token) return;

        
        const fetchToken = async () => {
            try {
                const response = await fetch(getUrl() + '/gameStart', {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ mapId })
                });

                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status}`);
                }

                const token  = await response.json();
                setToken(token); 
                sessionStorage.setItem("prevMapId", mapId)
                sessionStorage.setItem("token", token);
            } catch (err) {
                console.error("Token Fetch Error:", err);
            }
        };

        fetchToken();
    }, [mapId, token]);

    return { token, setToken };
}
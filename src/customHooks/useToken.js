import getUrl from '@/utils/getUrl.js';
import { useState, useEffect } from 'react';

export function useToken(mapId) {
    const [token, setToken] = useState(() => {
        return sessionStorage.getItem("token") || null
    });
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (!mapId) return;
        
        const fetchToken = async () => {
            setLoading(true);
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
            } catch (err) {
                console.error("Token Fetch Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchToken();
    }, [mapId, token]);

    return { token, loading, setToken };
}
const watchClicks = (cb, map) => {
    if (!map) return;

    const handleClick = (e) => {
        const rect = map.getBoundingClientRect();
        
        let x =  (e.clientX - rect.left) / rect.width;
        let y = (e.clientY - rect.top) / rect.height;
        console.log("Normalized x: " + x);
        console.log("Normalized y: " + y);
        cb({ x, y });
    }

    map.addEventListener('click', handleClick);

    return () => map.removeEventListener('click', handleClick);
}

export default watchClicks
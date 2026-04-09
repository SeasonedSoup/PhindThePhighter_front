const watchClicks = (cb, map) => {
    if (!map) return;

    const handleClick = (e) => {
        const rect = map.getBoundingClientRect();
        
        let x =  e.clientX - rect.left
        let y = e.clientY - rect.top
        
         x = (x / rect.width) * 100;
         y = (y / rect.height) * 100;
        cb({x, y})
    }

    map.addEventListener('click', handleClick);

    return () => map.removeEventListener('click', handleClick);
}

export default watchClicks
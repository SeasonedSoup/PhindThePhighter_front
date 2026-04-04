const watchClicks = (cb) => {
    
    const handleClick = (e) => {
        const coords = {x: e.clientX, y: e.clientY}
        cb(coords)
    }

    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
}

export default watchClicks
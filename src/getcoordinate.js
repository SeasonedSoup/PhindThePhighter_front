const watchClicks = (cb) => {
    
    const handleClick = (e) => {
        const coords = {x: e.pageX, y: e.pageY}
        cb(coords)
    }

    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
}

export default watchClicks
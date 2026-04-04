import { useEffect, useState } from 'react';
import './App.css'
import watchClicks from './getcoordinate';

function App() {
  const [pos, setPos] = useState({x:0, y: 0})

  useEffect(() => {
      const stopWatching = watchClicks((coords) => {
        setPos(coords)
        const square = document.querySelector('.square');
  

        square.style.left = coords.x + 'px';
        square.style.top = coords.y + 'px';
      })

      return () => {
        stopWatching();
      }
  }, [])
  return (
    <>
      <h1>Phind The Phighter!</h1>
      <h2>Current pos X:{pos.x}, Y:{pos.y}</h2>

      <div className='square'> Square</div>
    </>
  )
}

export default App

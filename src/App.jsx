import skateboardMap from './assets/BogioSkateparkSquare.png';

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
        square.style.display = "block";
      })

      return () => {
        stopWatching();
      }
  }, [])
  return (
    <div className='screen'>
      <div className='square'></div>
      <div className='stats'>
        <h1>Phind The Phighter!</h1>
        <h2>Current pos X:{pos.x}, Y:{pos.y}</h2>
        <h2>Choose a map and characters to find!</h2>
      </div>
      <div className='gameScreen'>
        <div className='map'>
          <img src={skateboardMap} alt="BogioSkateparkSquare" />
        </div>
      </div>

      <div className='dropdownMenu'>
        FIND THESE CHARACTERS!
        <button>Confirm</button>
      </div>
    </div>
  )
}

export default App

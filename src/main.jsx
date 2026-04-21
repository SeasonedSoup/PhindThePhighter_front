import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {RouterProvider, createBrowserRouter } from 'react-router'

import { Intro } from './components/Intro.jsx'
import TitleScreen from '@/components/TitleScreen.jsx';
import ChooseMap from '@/components/chooseMap.jsx'
import Gameplay from '@/components/Gameplay.jsx'
import PreviewMap from './components/PreviewMap.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Intro/>
  },
  {
    path: "/title",
    element: <TitleScreen/>
  },
  {
    path: "/maps",
    element: <ChooseMap/>
  },
  {
    path: "/mapInfo/:mapName",
    element: <PreviewMap/>
  },
  {
    path: "/game/:mapName",
    element: <Gameplay/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {RouterProvider, createBrowserRouter } from 'react-router'

import TitleScreen from './components/TitleScreen.jsx';
import ChooseMap from './components/chooseMap.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <TitleScreen/>
  },
  {
    path: "/maps",
    element: <ChooseMap/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)

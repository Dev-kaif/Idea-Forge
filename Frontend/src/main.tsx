import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx';
import Add from './Components/addContent.tsx'
import Landing from './Landing Page/Landing';
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    {/* <Landing/> */}
    <App />
    {/* <Add/> */}
    {/* <LoginPage/> */}
    </BrowserRouter>
  </StrictMode>,
)

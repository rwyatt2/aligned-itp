import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { ThemeProvider } from './context/ThemeContext'
import { DownloadGuardProvider } from './context/DownloadGuardContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <DownloadGuardProvider>
        <App />
      </DownloadGuardProvider>
    </ThemeProvider>
  </StrictMode>,
)


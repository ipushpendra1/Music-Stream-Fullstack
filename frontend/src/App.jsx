// import { useState } from 'react'
import AppRoutes from './routes/AppRoutes'
import ThemeProvider from './components/ThemeProvider'
import AudioPlayer from './components/AudioPlayer'
import './styles/themes.css'

function App() {
  return (
    <ThemeProvider>
      <AudioPlayer />
      <AppRoutes />
    </ThemeProvider>
  )
}

export default App
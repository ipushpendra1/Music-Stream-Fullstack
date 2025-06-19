import { useState } from 'react'
import AppRoutes from './routes/AppRoutes'
import ThemeProvider from './components/ThemeProvider'
import './styles/themes.css'

function App() {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  )
}

export default App
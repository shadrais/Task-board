import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { CalendarContextProvider } from './context/CalendarContext'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <CalendarContextProvider>
    <App />
  </CalendarContextProvider>
)

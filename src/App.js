import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { ToastContainer } from 'react-toastify'
import { CalendarContextProvider } from './context/CalendarContext'
import TaskBoard from './components/TaskBoard'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Signup from './components/Signup'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const [SignedIn, setSignedIn] = useState(false)
  const auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) setSignedIn(true)
    else setSignedIn(false)
  })

  return (
    <CalendarContextProvider>
      <Router>
        <Navbar SignedIn={SignedIn} />
        <Routes>
          <Route path='/' element={<TaskBoard SignedIn={SignedIn} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/sign-up' element={<Signup />} />
        </Routes>
      </Router>
      <ToastContainer autoClose={2000} theme='colored' />
    </CalendarContextProvider>
  )
}

export default App

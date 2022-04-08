import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import TaskBoard from './components/TaskBoard'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Signup from './components/Signup'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<TaskBoard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/sign-up' element={<Signup />} />
        </Routes>
      </Router>
      <ToastContainer autoClose='1000' theme='colored' />
    </>
  )
}

export default App

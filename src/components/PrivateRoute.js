import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import CalendarContext from '../context/CalendarContext'

const PrivateRoute = () => {
  const { SignedIn, checkStatus } = useContext(CalendarContext)

  if (checkStatus) {
    return (
      <div className='min-w-full flex'>
        <progress className='progress progress-primary w-56 mx-auto mt-48 '></progress>
      </div>
    )
  }

  return SignedIn ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoute

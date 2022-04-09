import { Link, useNavigate } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import { useContext } from 'react'
import CalendarContext from '../context/CalendarContext'

const Navbar = () => {
  const auth = getAuth()

  const { image, SignedIn } = useContext(CalendarContext)

  const navigate = useNavigate()

  const signOut = (e) => {
    navigate('/login')
    auth.signOut()
  }

  return (
    <div className='navbar bg-neutral text-neutral-content m-3 rounded w-11/12 mx-auto h-18 sm:h-28 '>
      <div className='flex-1'>
        <Link to='/' className='btn btn-ghost normal-case text-md md:text-xl'>
          TaskBoard
        </Link>
      </div>
      <div className='flex-none'>
        <ul className='menu menu-horizontal p-0'>
          {SignedIn ? (
            <>
              <div className='avatar'>
                <div className='w-12 rounded-full sm:w-24'>
                  <img src={image} alt='profile' />
                </div>
              </div>
              <li>
                <button
                  className='btn m-auto text-md ml-2 sm:text-xl '
                  onClick={signOut}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <Link
                to='/sign-up'
                className='btn m-auto text-md ml-2 sm:text-xl'>
                Sign Up
              </Link>
              <Link to='/login' className='btn m-auto text-md ml-2 sm:text-xl'>
                Login
              </Link>
            </>
          )}
          <li></li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar

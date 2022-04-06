import { Link, useNavigate } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import { useContext } from 'react'
import CalendarContext from '../context/CalendarContext'

const Navbar = ({ SignedIn }) => {
  const auth = getAuth()

  const { image } = useContext(CalendarContext)

  const navigate = useNavigate()

  const signOut = (e) => {
    auth.signOut()
    navigate('/')
  }

  return (
    <div className='navbar bg-neutral text-neutral-content m-3 rounded w-11/12 mx-auto h-28 '>
      <div className='flex-1'>
        <a href='/' className='btn btn-ghost normal-case text-xl'>
          TaskBoard
        </a>
      </div>
      <div className='flex-none'>
        <ul className='menu menu-horizontal p-0'>
          {SignedIn ? (
            <>
              <div className='avatar'>
                <div className='w-24 rounded-full'>
                  <img src={image} alt='profile' />
                </div>
              </div>
              <li>
                <button className='btn m-auto text-xl ml-2 ' onClick={signOut}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <Link to='/login'>
              <button className='btn m-auto text-xl ml-2 '>Login</button>
            </Link>
          )}
          <li></li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar

import { useState, useContext, useEffect } from 'react'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import CalendarContext from '../context/CalendarContext'
import { db } from '../firebase.config'

import { Link, useNavigate } from 'react-router-dom'
import { serverTimestamp, setDoc, doc } from 'firebase/firestore'
import { toast } from 'react-toastify'

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const [loading, setLoading] = useState(false)
  const { SignedIn } = useContext(CalendarContext)
  const { name, email, password } = form
  const navigate = useNavigate()
  const onChange = (e) => {
    setForm((prevState) => ({ ...prevState, [e.target.id]: e.target.value }))
  }
  useEffect(() => {
    if (SignedIn) {
      navigate('/')
    }
  })

  const onSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    try {
      const auth = getAuth()
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredentials.user
      updateProfile(auth.currentUser, { displayName: name })

      const formCopy = { ...form }
      delete formCopy.password
      formCopy.timestamp = serverTimestamp()
      const docRef = doc(db, 'users', user.uid)
      await setDoc(docRef, formCopy)
      toast.success('Logged In')
      setLoading(false)
      navigate('/')
    } catch (error) {
      setLoading(false)
      toast.error('Something went wrong')
    }
  }

  if (loading) {
    return (
      <div className='min-w-full flex'>
        <progress className='progress progress-primary w-56 mx-auto mt-48 '></progress>
      </div>
    )
  }

  return (
    <div className=' w-full max-w-xs m-auto  relative sm:top-20 sm:max-w-md'>
      <form
        onSubmit={onSubmit}
        className='bg-neutral  shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <h2 className='card-body text-neutral-content text-center font-bold text-2xl sm:text-3xl my-auto'>
          Sign Up
        </h2>
        <div className='mb-4'>
          <label
            className='block text-neutral-content text-sm font-bold mb-2'
            htmlFor='username'>
            Name
          </label>
          <input
            className='input input-bordered input-secondary  w-full max-w-full'
            id='name'
            type='text'
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className='mb-4'>
          <label
            className='block text-neutral-content text-sm font-bold mb-2'
            htmlFor='email'>
            Email
          </label>
          <input
            className='input input-bordered input-secondary  w-full max-w-full'
            id='email'
            type='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className='mb-6'>
          <label
            className='block text-neutral-content text-sm font-bold mb-2'
            htmlFor='password'>
            Password
          </label>
          <input
            className='input input-bordered input-secondary  w-full max-w-full'
            id='password'
            type='password'
            value={password}
            onChange={onChange}
            required
            minLength={6}
          />
        </div>
        <div className='flex items-center justify-between'>
          <button
            className='btn btn-primary text-sm sm:text-lg  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='submit'>
            Sign Up
          </button>
          <Link
            className='btn pt-3 w-3/5 sm:w-fit inline-block text-xs  align-baseline font-bold sm:text-sm'
            to='/login'>
            Already have an account?
          </Link>
        </div>
      </form>
      <p className='text-center text-gray-500 text-xs'>
        &copy;2022 Made by Shad.
      </p>
    </div>
  )
}

export default Signup

import React, { useState, useContext, useEffect } from 'react'
import CalendarContext from '../context/CalendarContext'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const Login = () => {
  const [form, setForm] = useState({ password: '', email: '' })

  const { password, email } = form
  const [loading, setLoading] = useState(false)
  const { SignedIn } = useContext(CalendarContext)
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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      if (userCredential.user) {
        toast.success('Loggen in')

        setLoading(false)
        navigate('/')
      }
    } catch (error) {
      setLoading(false)
      toast.error('Wrong Credentials')
    }
  }

  if (loading) {
    return (
      <div className='min-w-full flex'>
        <progress className='progress progress-primary  w-56 mx-auto mt-48 '></progress>
      </div>
    )
  }

  return (
    <div className='w-full max-w-xs m-auto  relative sm:top-20 sm:max-w-md  '>
      <form
        onSubmit={onSubmit}
        className=' bg-neutral shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <h2 className='card-body  text-neutral-content text-center font-bold text-2xl sm:text-3xl my-auto'>
          Login
        </h2>
        <div className='mb-4'>
          <label
            className='block  text-neutral-content text-sm font-bold mb-2'
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
            className='block  text-neutral-content text-sm font-bold mb-2'
            htmlFor='password'>
            Password
          </label>
          <input
            className='input input-bordered input-secondary  w-full max-w-full'
            id='password'
            type='password'
            placeholder={password}
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <div className='flex items-center justify-between'>
          <button
            className='btn btn-primary text-xs sm:text-xl  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='submit'>
            Sign In
          </button>
          <Link
            className='btn pt-3 inline-block text-xs  align-baseline font-bold sm:text-sm '
            to='/sign-up'>
            Don't have an account?
          </Link>
        </div>
      </form>
      <p className='text-center text-gray-500 text-xs'>
        &copy;2022 Made by Shad.
      </p>
    </div>
  )
}

export default Login

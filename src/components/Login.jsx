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
        <progress className='progress  w-56 mx-auto mt-48 '></progress>
      </div>
    )
  }

  return (
    <div className='w-full max-w-xs m-auto  relative sm:top-20 sm:max-w-md  '>
      <form
        onSubmit={onSubmit}
        className=' bg-neutral shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <h2 className='card-body text-center font-bold text-2xl sm:text-3xl my-auto'>
          Login
        </h2>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='email'>
            Email
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='email'
            type='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className='mb-6'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='password'>
            Password
          </label>
          <input
            className='shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
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
            className='btn btn-secondary text-xs sm:text-xl  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='submit'>
            Sign In
          </button>
          <Link
            className='inline-block text-xs  align-baseline font-bold sm:text-sm text-blue-500 hover:text-blue-800'
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

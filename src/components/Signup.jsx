import { useState } from 'react'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { db } from '../firebase.config'

import { Link, useNavigate } from 'react-router-dom'
import { serverTimestamp, setDoc, doc } from 'firebase/firestore'
import { toast } from 'react-toastify'

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const [loading, setLoading] = useState(false)

  const { name, email, password } = form
  const navigate = useNavigate()
  const onChange = (e) => {
    setForm((prevState) => ({ ...prevState, [e.target.id]: e.target.value }))
  }

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
      toast.error('Something went wrong')
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
    <div className=' w-full max-w-xs m-auto  relative sm:top-20 sm:max-w-md'>
      <form
        onSubmit={onSubmit}
        className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <h2 className='card-body text-center font-bold text-3xl my-auto'>
          Sign Up
        </h2>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='username'>
            Name
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='name'
            type='text'
            value={name}
            onChange={onChange}
            required
          />
        </div>
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
            value={password}
            onChange={onChange}
            required
            minLength={6}
          />
        </div>
        <div className='flex items-center justify-between'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='submit'>
            Sign Up
          </button>
          <Link
            className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
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

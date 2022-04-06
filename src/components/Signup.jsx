import { useState } from 'react'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { db } from '../firebase.config'

import { Link, useNavigate } from 'react-router-dom'
import { serverTimestamp, setDoc, doc } from 'firebase/firestore'

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const { name, email, password } = form
  const navigate = useNavigate()
  const onChange = (e) => {
    setForm((prevState) => ({ ...prevState, [e.target.id]: e.target.value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
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
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className=' w-full max-w-md m-auto top-20 relative'>
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
            placeholder='Name'
            value={name}
            onChange={onChange}
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
            placeholder='email'
            value={email}
            onChange={onChange}
          />
        </div>
        <div className='mb-6'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='password'>
            Password
          </label>
          <input
            className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
            id='password'
            type='password'
            placeholder='Set Password'
            value={password}
            onChange={onChange}
          />
          <p className='text-red-500 text-xs italic'>
            Please choose a password.
          </p>
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
        &copy;2022 Made with Love by Shad.
      </p>
    </div>
  )
}

export default Signup

import { useState } from 'react'
import uniqid from 'uniqid'
import { getAuth } from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../firebase.config'

import { FaPlusCircle } from 'react-icons/fa'
import { toast } from 'react-toastify'

const AddTask = () => {
  const [feild, setFeild] = useState({ task: '', completed: false })

  const auth = getAuth()

  const { task } = feild

  const addTask = async () => {
    if (task.trim().length === 0) {
      return toast.error('Please enter task')
    }
    try {
      if (auth.currentUser) {
        const feildCopy = { ...feild }
        feildCopy.userRef = auth.currentUser.uid
        feildCopy.timestamp = serverTimestamp()
        const docRef = doc(db, 'tasks', uniqid())
        await setDoc(docRef, feildCopy)
        toast.success('Task Added')
        setFeild((prevState) => ({ ...prevState, task: '' }))
      }
    } catch (error) {
      toast.error('Unable to Add Task')
    }
  }

  return (
    <div className='flex justify-center  '>
      <input
        type='text'
        placeholder='Add Task'
        className='input input-bordered input-secondary  text-lg basis-4/5 sm:max-w-full  ml-6  max-w-xs '
        value={task}
        onChange={(e) => {
          setFeild((prevState) => ({ ...prevState, task: e.target.value }))
        }}
      />
      <button
        type='button'
        onClick={addTask}
        className='btn  mb-5 ml-2 mr-2 xs:mr-0'>
        <FaPlusCircle className='text-xl sm:text-3xl' />
      </button>
    </div>
  )
}

export default AddTask

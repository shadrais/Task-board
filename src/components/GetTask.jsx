import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import {
  updateDoc,
  doc,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  deleteDoc,
} from 'firebase/firestore'
import { db } from '../firebase.config'
import { RiDeleteBin5Fill } from 'react-icons/ri'

const GetTask = () => {
  const [data, setData] = useState(null)
  const auth = getAuth()

  useEffect(() => {
    const fetchData = async () => {
      const collectioRef = collection(db, 'tasks')
      const q = query(
        collectioRef,
        where('userRef', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc')
      )
      onSnapshot(q, (querySnap) => {
        let tasks = []
        querySnap.forEach((task) => {
          tasks.push({
            id: task.id,
            task: task.data(),
          })
        })
        setData(tasks)
      })
    }
    onAuthStateChanged(auth, (user) => {
      fetchData()
    })
  }, [auth, auth.currentUser])

  if (!data) {
    return <progress className='progress w-56'></progress>
  }
  const onChange = async (e) => {
    try {
      const docRef = doc(db, 'tasks', e.target.id)
      await updateDoc(docRef, {
        completed: e.target.checked,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const onDelete = async (e) => {
    try {
      console.log(e.currentTarget.id)
      if (window.confirm('Are you sure want to delete?')) {
        await deleteDoc(doc(db, 'tasks', e.currentTarget.id))
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {data.map(({ task, id }) => (
        <div
          key={id}
          className='card my-5 mx-auto h-20 w-11/12 items-center border-2 flex-row justify-around'>
          <input
            type='checkbox'
            id={id}
            // checked='checked'
            // {console.log(task.completed)}

            checked={task.completed}
            onChange={onChange}
            className='checkbox checkbox-secondary'
          />
          <p
            className={`py-3 text-2xl  ${
              task.completed ? 'line-through' : 'font-bold'
            }`}>
            {task.task}
          </p>
          <button className='btn' id={id} onClick={onDelete}>
            <RiDeleteBin5Fill className='text-xl' />
          </button>
        </div>
      ))}
    </>
  )
}

export default GetTask

import AddTask from './AddTask'
import GetTask from './GetTask'
import { useNavigate } from 'react-router-dom'

const TaskBoard = ({ SignedIn }) => {
  const navigate = useNavigate()
  if (!SignedIn) {
    return (
      <div className='hero mx-auto mt-10 rounded-lg  w-2/3 bg-base-200'>
        <div className='hero-content  text-center'>
          <div className='max-w-md'>
            <h1 className='text-2xl mb-5 font-bold md:text-5xl '>
              Login to Continue
            </h1>
            <button
              className='btn btn-primary'
              onClick={() => {
                navigate('/login')
              }}>
              Sign In
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='card max-w-lg bg-neutral text-neutral-content shadow-xl mx-auto my-10'>
      <div className='card-body '>
        <h2 className='card-title'>My Task</h2>
      </div>
      <AddTask />
      <GetTask />
    </div>
  )
}

export default TaskBoard

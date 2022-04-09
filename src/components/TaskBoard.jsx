import AddTask from './AddTask'
import GetTask from './GetTask'

const TaskBoard = () => {
  return (
    <div className='mx-3'>
      <div className='card max-w-lg bg-neutral text-neutral-content shadow-xl mx-auto my-10'>
        <div className='card-body '>
          <h2 className='card-title text-md sm:text-xl'>My Task</h2>
        </div>
        <AddTask />
        <GetTask />
      </div>
    </div>
  )
}

export default TaskBoard

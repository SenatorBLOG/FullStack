import { useState } from 'react'

import './App.css'
import initialTasks from './assets/task-data.json'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'

function App() {
  const [tasks, setTasks] = useState(initialTasks)

  const deleteTask = (id) => {
      const newTasks = tasks.filter(task=>task.id!==id);
      setTasks(newTasks);
   }
  const setPriority = (id, priority) => {
    const newPriority = tasks.map(task=>task.id!==id?task:{...task,priority:priority});
    setTasks(newPriority);
  }
  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text:text,
      priority: "Low"
    };
    setTasks(...tasks, newTask)
  }

  return (
    <>
      <div style={{backgroundColor: 'lightblue',padding:20}} >
        <TaskList tasks={tasks}
        onDeleteTask={deleteTask}
        onSetPriority={setPriority} 
        />
        <TaskForm
        addTask={addTask}
        />
      </div>

    </>
  )
}

export default App

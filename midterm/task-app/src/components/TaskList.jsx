import Task from './task'
const TaskList = ({tasks, onDeleteTask=f=>f, onSetPriority=f=>f}) => {
    return ( <>
        <h1>You have {tasks.length} task</h1>
        <div className="tasks">
            {tasks.map(taskObj=><Task
            key={taskObj.id}
            taskObj={taskObj}
            onDelete={onDeleteTask}
            onSetPriority={onSetPriority}
            />)}
        </div>
    </> );
}
 
export default TaskList;
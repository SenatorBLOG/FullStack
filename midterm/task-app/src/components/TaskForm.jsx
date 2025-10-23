import { useState } from "react";

const TaskForm = ({addTask}) => {
    let [input, setInput] = useState('')
    addTask(input);
    setInput('')
    return ( <div>
        <input id="newTaskId" type="text" name={input} placeholder="Enter new Task" /><br/>
        <input onCLick={()=>addTask(()=>document.getElementById('newTaskId'))} type="submit" value="Submit" />
    </div> );
}
 
export default TaskForm;
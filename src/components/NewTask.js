import './NewTask.css';

import {React, useState} from 'react';

function NewTask(props){


    const [id, setId] = useState(2)
    
    const [task, setTask] = useState({
        complete:false, 
        key:id,
        content:""
    });

    const getTask =(event)=> {
        setTask(prevState=> {
            return{ ...prevState,
                content:event.target.value}
        })
    }

    const submitTask =(event)=>{
        event.preventDefault()
        props.addNewTask(task);
    
        setTask({
            complete:false, 
            key:id+1,
            content:""});

        setId(prevState=> prevState+1)
    }

    return(
        <form onSubmit={submitTask}>
           <button type="submit">+</button>
           <input required placeholder='Create a new todo...'
                  onChange={getTask} 
                  value={task.content}/>
                  
        </form>
    )
}

export default NewTask;
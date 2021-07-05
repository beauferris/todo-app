import './App.css';
import Task from './components/Task';
import NewTask from './components/NewTask';
import { useState, useEffect } from 'react';

import Stats from './components/Stats';


function App() {
  const [count, setCount] = useState(2);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
   getCount()
  });

  const [tasks, setTasks] = useState([{
    key:0,
    content:"Complete online Javascript course",
    complete:false
  },
  {
    key:1,
    content: "frig",
    complete:false
  }
  ]);


  const changeFilter =(event)=>{
    setFilter(event.target.value);
  }

  let filteredTasks = (filter === "Active"? tasks.filter(task=>task.complete===false)
    :filter === "Completed" ? tasks.filter(task=>task.complete===true): tasks)

  const getCount =()=> {
    const filteredTasks = tasks.filter(task=>task.complete===false)
     setCount(filteredTasks.length);
  }

  const addTask = (task) =>{
    setTasks([task,...tasks])
  }

  const checkHandler =(event)=>{   
    const newTodos = [...tasks]
    const checkedTask = newTodos.find((task,index) =>task.key===+event.target.value)
    const index = (newTodos.indexOf(checkedTask))
    newTodos[index].complete = !newTodos[index].complete;
    setTasks(newTodos)
  }
  
  const taskList = filteredTasks.map(task => {
    return(<Task 
      key = {task.key}
      id={task.key}
      content={task.content} 
      checked={task.complete}
      click={checkHandler}></Task>)
  }
  );

  const clearCompleted = () =>{
    const newTodos = tasks.filter(task => task.complete === false)
    setTasks(newTodos)
  }

  return (
    <div className="App">
      <h2>TODO</h2>
      <div className ="app">
      <NewTask addNewTask={addTask}></NewTask>
      <div className='tasks'>
        {taskList}
      </div>
      <Stats filter = {filter} onClick={changeFilter} clear ={clearCompleted} count={count}></Stats>
    </div>
    </div>
  );
}

export default App;

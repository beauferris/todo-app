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
    complete:true
  },
  {
    key:1,
    content: "Jog around the park 3x",
    complete:false
  },
  {
    key:3,
    content: "10 minutes meditation",
    complete:false
  },
  {
    key:4,
    content: "Read for 1 hour",
    complete:false
  },
  {
    key:5,
    content: "Pick up groceries",
    complete:false
  },{
    key:6,
    content: "Complete Todo App on Frontend Mentor",
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
  

  const clearCompleted = () =>{
    const newTodos = tasks.filter(task => task.complete === false)
    setTasks(newTodos)
  }


  const deleteTask = (event) =>{
    const newTodos = tasks.filter(task=> task.key !== +event.target.value);
    console.log(event.target.value)
    setTasks(newTodos) 
  }


  const taskList = filteredTasks.map(task => {
    return(<Task 
      key = {task.key}
      id={task.key}
      content={task.content} 
      checked={task.complete}
      click={checkHandler}
      onClick={deleteTask}></Task>)
  }
  );


  return (
    <div className="App">
      <h2>TODO</h2>
      <div className ="app">
      <NewTask  addNewTask={addTask}></NewTask>
      <div className='tasks'>
        {taskList}
      </div>
      <Stats filter = {filter} onClick={changeFilter} clear ={clearCompleted} count={count}></Stats>
    </div>
    </div>
  );
}

export default App;

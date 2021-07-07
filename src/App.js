import './App.css';
import Task from './components/Task';
import NewTask from './components/NewTask';
import { useState, useEffect } from 'react';

import Stats from './components/Stats';
import { ReactSortable } from 'react-sortablejs';


function App() {
  const [count, setCount] = useState(0);
  
  const [filter, setFilter] = useState(
    localStorage.getItem('filterLocal') || 'All'
  );

  useEffect(() => {
    localStorage.setItem('filterLocal', filter);
  }, [filter]);

  useEffect(() => {
    getCount()

  });

  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem('taskLocal')) || []
  );

  useEffect(() => {
    localStorage.setItem('taskLocal', JSON.stringify(tasks));
  }, [tasks]);
  
  const [filteredTasks, setFilteredTasks] = useState(tasks)

  useEffect(() => {
    filterTasks()
  }, [filter, tasks])

  

  const changeFilter = (event) => {
    setFilter(event.target.value);
  }

  const filterTasks = () => {
    switch (filter) {
      case "Active":
        setFilteredTasks(tasks.filter(task => task.complete === false));
        break;
      case "Completed":
        setFilteredTasks(tasks.filter(task => task.complete === true));
        break;
      default:
        setFilteredTasks(tasks)
    }
  }


  const getCount = () => {
    const filteredTasks = tasks.filter(task => task.complete === false)
    setCount(filteredTasks.length);
  }

  const addTask = (task) => {
    setTasks([task, ...tasks])
  }

  const checkHandler = (event) => {
    const newTodos = [...tasks]
    const checkedTask = newTodos.find((task, index) => task.key === +event.target.value)
    const index = (newTodos.indexOf(checkedTask))
    newTodos[index].complete = !newTodos[index].complete;

    setTasks(newTodos)
  }

  const clearCompleted = () => {
    const newTodos = tasks.filter(task => task.complete === false)
    setTasks(newTodos)
  }

  const deleteTask = (event) => {
    const newTodos = tasks.filter(task => task.key !== +event.target.value);
    setTasks(newTodos)
  }

  const taskList = filteredTasks.map((task, index) => {
    return (<Task
      key={task.key}
      data-id={task.key}
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
      <div className="app">
        <NewTask addNewTask={addTask}></NewTask>

        <div className='tasks'>

          <ReactSortable animation={200} list={filteredTasks} setList={setFilteredTasks} 

            onEnd={(event) => {
              const newItems = [...taskList]
              let newTasks = [...tasks]
              const keys = []

              newItems.forEach(item=>{
                keys.push(item.key)
              })
       
              let final = []


             keys.forEach((key,i)=>{
              
                newTasks.forEach((task,i)=>{
                  if(task.key === +key){
                    final.push(newTasks[i])
                  }
                })         
             })
             setTasks(final)
            }}>

            {taskList}

          </ReactSortable>

        </div>
        <Stats filter={filter} onClick={changeFilter} clear={clearCompleted} count={count}></Stats>
      </div>
    </div>
  );
}

export default App;

import "./Task.css"

function Task(props){
    return(<div className="task">
        <div className="content">

       
        <input type="checkbox" 
            id={props.id}
            value={props.id} 
            checked={props.checked}
            onChange={props.click}></input>
            
        <label htmlFor={props.id}> {props.content}</label>
        </div>
        <button className="delete" value={props.id} onClick={props.onClick}>X</button>

    </div>)
}

export default Task;

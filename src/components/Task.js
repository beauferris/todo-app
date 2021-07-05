import "./Task.css"

function Task(props){
    return(<div className="task">
        <input type="checkbox" 
            id={props.id}
            value={props.id} 
            checked={props.checked}
            onChange={props.click}></input>
        <label for={props.id}> {props.content}</label><br></br>
    </div>)
}

export default Task;


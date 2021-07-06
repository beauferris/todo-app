import "./Stats.css"

function Stats(props){
    return(<div className="stats">
        <span className="count">{props.count} items left</span>

        <div className="filter">
            <button className = {props.filter === "All" ? "active":""} onClick={props.onClick} value="All">All</button>
            <button className = {props.filter === "Active" ? "active":""} onClick={props.onClick} value="Active">Active</button>
            <button className = {props.filter === "Completed" ? "active":""} onClick={props.onClick} value="Completed">Completed</button>
        </div>
       
        <button className = {props.filter === "Clear" ? "active":"clear"} onClick={props.clear} value="Clear">Clear Completed</button>
    </div>)
}

export default Stats;


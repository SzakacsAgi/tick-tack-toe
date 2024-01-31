import {useState} from "react";

export default function Player({playerName, symbol, isActive, onNameChange}){
    const [isEditing, setIsEditing] = useState(false);
    const [changedName, setChangedName] = useState(playerName);

    function handelEditButtonClick() {
        onNameChange(changedName, symbol);
        setIsEditing(prevState => !prevState);
    }

    function handelOnChange(event){
        setChangedName(event.target.value);
    }

    return (
        <li className={isActive ? "active" : ''}>
            <span className="player">
                {isEditing ? <input type="text" defaultValue={changedName} onChange={handelOnChange}/>:<span className="player-name">{changedName}</span>}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handelEditButtonClick}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    )
}
import React from "react";
import { IToDo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";

function ToDo({text, category, id}:IToDo) {
    const setToDo = useSetRecoilState(toDoState);
    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log("test", event);
        const {
            currentTarget: {name},
        } = event;
        console.log(name)
    }
    // const onclick = (newCategory:IToDo["category"]) => {
    //     console.log('test dkdkdk', newCategory)
    // }
    return (
        <li>
            <span>{text}</span>
            {category !== "DOING" && (
                <button name="DOING" onClick={onClick}>Doing</button> 
                // <button onClick={() => onclick("DOING")}>Doing</button>
            )}
            {category !== "TO_DO" && (
                <button name="TO_DO" onClick={onClick}>To Do</button>
            )}
            {category !== "DONE" && (
                <button name="DONE" onClick={onClick}>Done</button>
            )}
        </li>
    );
}

export default ToDo;
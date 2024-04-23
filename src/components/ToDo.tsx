import React from "react";
import { IToDo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";

function ToDo({text, category, id}:IToDo) {
    const setToDos = useSetRecoilState(toDoState);
    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log("test", event);
        const {
            currentTarget: {name},
        } = event;
        console.log(name)
        setToDos((oldToDos) => {
            // 카테고리 클릭시 할일 상태 데이터 지우고 새 배열 만들기(toDo 데이터 업데이트 하는게 아님)
            //1. 클릭한 카테고리 id로 todo를 찾아야 한다.
            const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
            // console.log(targetIndex)
            //2. 원래의todo를 update 해야함.
            const oldToDo = oldToDos[targetIndex];
            const newToDo = { text, id, category: name as any }; //category 데이터 타입은 "TO_DO" | "DOING" | "DONE" 이거 세가지 밖에 없다고 에러,as any로 회피
            console.log(oldToDo, newToDo);// old와 new의 위치를 알았으니까 
            // targetInde에 있는 todo를 newTodo로 바꿔줘야 한다.()
            return [
                ...oldToDos.slice(0, targetIndex),//타겟 index 앞에 있는 데이터 전부
                newToDo,//수정 되는 타겟 데이터
                ...oldToDos.slice(targetIndex + 1),//타겟 index 뒤에 있는 데이터 끝까지
            ];
        });
        
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
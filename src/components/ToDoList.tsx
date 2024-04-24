import { useRecoilState, useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDo";
import { Categories, categoryState, toDoSelector, toDoState } from "../atoms";
import ToDo from "./ToDo";
import React from "react";

function ToDoList() {
  // const [toDo, doing, done] = useRecoilValue(toDoSelector);
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  }
  console.log(category);

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      {/* value={category}?  */}
      <select onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
      <CreateToDo />
      {/* {category === "TO_DO" && toDo.map(toDo => <ToDo key={toDo.id} {...toDo} />)}
      {category === "DOING" && doing.map(toDo => <ToDo key={toDo.id} {...toDo} />)}
      {category === "DONE" && done.map(toDo => <ToDo key={toDo.id} {...toDo} />)} */}
      {toDos.map(toDo => <ToDo key={toDo.id} {...toDo}/>)}
    </div>
  );
}


export default ToDoList;
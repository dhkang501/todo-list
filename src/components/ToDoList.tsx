import { useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDo";
import { toDoSelector, toDoState } from "../atoms";
import ToDo from "./ToDo";

function ToDoList() {
  // const value = useRecoilValue(toDoState);// atom의 value를 불러옴
  // const modFn = useSetRecoilState(toDoState);// atom의 value를 변경해야 하는 경우
  const toDos = useRecoilValue(toDoState);
  const selectorOutput = useRecoilValue(toDoSelector);
  //카테고리별로 구분해서 render 
  const [toDo, doing, done] = useRecoilValue(toDoSelector);

  console.log(selectorOutput, '---todo---');
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <CreateToDo />
      <h2>TODO</h2>
      <ul>
        {toDo.map((toDo) => (
          // <ToDo text={toDo.text} category={toDo.category} id={toDo.id} />
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
      <h2>DOING</h2>
      <ul>
        {doing.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
      <h2>DONE</h2>
      <ul>
        {done.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}


export default ToDoList;
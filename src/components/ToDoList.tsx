import { useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDo";
import { toDoState } from "../atoms";
import ToDo from "./ToDo";

function ToDoList() {
  // const value = useRecoilValue(toDoState);// atom의 value를 불러옴
  // const modFn = useSetRecoilState(toDoState);// atom의 value를 변경해야 하는 경우
  const toDos = useRecoilValue(toDoState);

  console.log(toDos, '---todo---');
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <CreateToDo />
      <ul>
        {toDos.map((toDo) => (
          // <ToDo text={toDo.text} category={toDo.category} id={toDo.id} />
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}


export default ToDoList;
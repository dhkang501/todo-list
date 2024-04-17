import { useForm } from "react-hook-form";
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

interface IForm {
  toDo: string;
}

// category는 TO_DO 이거나 DOING 이거나 DONE 이것만 받을 수 있다.
interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE"
}

const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
})

function ToDoList() {
  // const value = useRecoilValue(toDoState);// atom의 value를 불러옴
  // const modFn = useSetRecoilState(toDoState);// atom의 value를 변경해야 하는 경우
  const [toDos, setToDos] = useRecoilState(toDoState);
  const {register, handleSubmit, setValue} = useForm<IForm>()
  const handleValid = ({toDo}:IForm) => {
    console.log(toDo);//input에 ...register("toDo") 이게 그대로 들어간다. 
    // setToDos(oldToDos=> [oldToDos]); // 배열 안에 배열을 담아서 반환
    setToDos(oldToDos => [{text: toDo, id: Date.now(), category: "TO_DO"}, ...oldToDos]); // oldToDos의 요소들이 들어있는 배열을 반환
    setValue("toDo", ""); //input 입력후 문자열 비우기
  }

  console.log(toDos, '---todo---');
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <form onSubmit={handleSubmit(handleValid)}>
        <input {...register("toDo", {
            required: "Please write a  To Do"
          })} 
          placeholder="Write a to do" 
          />
          <button>Add</button>
      </form>
      <ul>
        {toDos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}


export default ToDoList;
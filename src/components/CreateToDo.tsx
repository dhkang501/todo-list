import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";

function CreateToDo() {
    interface IForm {
        toDo: string;
    }

    const setToDos = useSetRecoilState(toDoState)
    const {register, handleSubmit, setValue} = useForm<IForm>();
    const handleValid = ({toDo}:IForm) => {
        console.log(toDo);//input에 ...register("toDo") 이게 그대로 들어간다. 
        // setToDos(oldToDos=> [oldToDos]); // 배열 안에 배열을 담아서 반환
        setToDos(oldToDos => [{text: toDo, id: Date.now(), category: "TO_DO"}, ...oldToDos]); // oldToDos의 요소들이 들어있는 배열을 반환
        setValue("toDo", ""); //input 입력후 문자열 비우기
    }
    
    return (
        <form onSubmit={handleSubmit(handleValid)}>
            <input {...register("toDo", {
                required: "Please write a  To Do"
            })} 
            placeholder="Write a to do" 
            />
            <button>Add</button>
        </form>
    );
}

export default CreateToDo;
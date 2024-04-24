import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";

function CreateToDo() {
    interface IForm {
        toDo: string;
    }

    const setToDos = useSetRecoilState(toDoState);
    const category = useRecoilValue(categoryState);
    const {register, handleSubmit, setValue} = useForm<IForm>();
    const handleValid = ({toDo}:IForm) => {
        console.log(toDo);//input에 ...register("toDo") 이게 그대로 들어간다. 
        // setToDos(oldToDos=> [oldToDos]); // 배열 안에 배열을 담아서 반환
        //toDo를 추가할때 매번 TO_DO 카테고리로 들어가고 있음, categoryState에 따라서 추가하도록 수정
        setToDos(oldToDos => [{text: toDo, id: Date.now(), category: category}, ...oldToDos]); // oldToDos의 요소들이 들어있는 배열을 반환
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
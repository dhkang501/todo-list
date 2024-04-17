import { useForm } from "react-hook-form";

interface IForm {
  toDo: string;
}

function ToDoList() {
  // 모든 기능은 {} 이 객체에서 나온다.
  // register: 이 함수를 모든 input에서 호출해서 사용한다.
  // handleSubmit: form 유효성 검사가 성공하면 form 데이터를 받음
  // setValue: 
  const {register, handleSubmit, setValue} = useForm<IForm>()
  // 내가 만든 함수, handleSubmit 이거는 useForm에서 가져온 함수
  const onSubmit = (data:IForm) => {
    console.log(data.toDo);//input에 ...register("toDo") 이게 그대로 들어간다. 
    setValue("toDo", ""); //input 입력후 문자열 비우기
  }
  return (
    <div>
      {/* handleSubmit 함수를 사용할때는 첫번째 매개변수로 데이터가 유효할 떄 호출되는 다른 함수를 받는다. 
      원한다면 데이터가 유효하지 않을때 호출 될 다른 함수를 2번째 매개변수로 넣을 수 도 있다*/}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("toDo", {
            // required: true, //필수 값 확인
            required: "Please write a  To Do"
          })} 
          placeholder="Write a to do" 
          />
          <button>Add</button>
      </form>
    </div>
  );
}


export default ToDoList;
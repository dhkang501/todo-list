import React, { useState } from "react";
import { useForm } from "react-hook-form";

// function ToDoList() {
//   const [toDo, setToDo] = useState("");
//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setToDo(value);
//   };
//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     console.log(toDo);
//   };
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input onChange={onChange} value={toDo} placeholder="Write a to do" />
//         <button>Add</button>
//       </form>
//     </div>
//   );
// }

interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  password1: string;
  extraError?: string;
}
function ToDoList() {
  // register: 이 함수는 useForm hook을 사용해서 가져올 수 있고, 이 함수를 모든 input에서 호출해서 사용한다
  // watch: form 입력값들 변화를 관찰함
  // handleSubmit: form 유효성 검사가 성공하면 form 데이터를 받음
  // formState: 이 객체에는 전체 폼 상태에 대한 정보가 포함되어 있습니다. 이를 통해 사용자의 폼 애플리케이션 상호작용을 추적하는 데 도움이 됩니다.
  // setError: 특정한 에러를 발생시킴
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  // console.log(watch);
  //유효성 검사
  const onValid = (data:IForm) => {
    if(data.password !== data.password1){
      //직접 에러 설정
      //shouldFocus: 에러나면 커서 포커스 옮겨짐
      setError(
        "password1",
        {message: "Password are not the same"},
        {shouldFocus: true}
      );
    }
    setError("extraError", { message: "Server offline." });
  }
  // console.log(formState.errors, 'dddd');
  console.log(errors, 'dddd');
  return (
    <div>
      {/* handleSubmit:
      -  을 사용하여 onSubmit 대체. handleSubmit 이 호출하는 함수는 두 개다. 하나는 호출이 성공했을때, 하나는 호출이 실패했을 때. 
      - 모든 validation이 우리가 handleSubmit을 호출하면 수행한다.
      */}
      <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit(onValid)}>
        {/* 
        - register: 함수가 반환하는 객체를 가져다 input에 props로 가져다줌 
        - required:true :그냥 input에 required를 사용할 수 있지만, 그것은 변경이 가능하다. 따라서 html이 아닌 js에서 validation을 할 수 있다.
          버튼 클릭시 input에 에러가 있으면 그곳으로 커서가 가있다.(예: 이메일 공백 다른 인풋 채우고 버튼 클릭시 이메일로 커서가 가있음)
        */}
        {/*...register: react-hook-form이 알 수 있도록, input의 이름을 줘야한다. 그래야  react-hook-form이 data 객체에 input 값을 주고, 에러를 확인 할 수 있다.*/}
        {/* validate: 옵션들에 검사 규칙 설정하면 react-hook-form이 그 input에 대한 검사를 자동으로 해준다. */}
        {/* react-hook-formdms error 객체를 제공한다. 우리가 설정한 규칙과 메세지에 따라 알아서 채워지기 때문에 작업하기 편하다. */}
        <input
          {...register("firstName", { required: true })}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com emails allowed",
            },
          })}
          placeholder="Email"
        />
        <span>{errors?.email?.message}</span>
        <input {...register("firstName", { 
          required: "write here" ,
          validate: {
            noNico: (value) =>
              value.includes("nico") ? "no nicos allowed" : true,//false 반환시 error
            noNick: (value) =>
              value.includes("nick") ? "no nick allowed" : true,
          },
          })} 
          placeholder="First Name" 
        />
        <span>{errors?.firstName?.message}</span>
        <input {...register("lastName", {required:"write here" })} placeholder="Last Name" />
        <span>{errors?.lastName?.message}</span>
        <input {...register("username", {required:"write here"})} placeholder="Username" />
        <span>{errors?.username?.message}</span>
        <input {...register("password", {required:"write here", minLength: 10})} placeholder="Password" />
        <span>{errors?.password?.message}</span>
        <input {...register("password1", {
            required:"Password is required",             
            minLength: {
                value: 5,
                message: "Your password is too short.",
            },
          })} 
          placeholder="Password1" 
        />
        <span>{errors?.password1?.message}</span>
        <button>Add</button>
        {/* ?를 붙이면 그 항목이 undefined면 그 뒤를 실행하지 않는다 */}
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
}

export default ToDoList;
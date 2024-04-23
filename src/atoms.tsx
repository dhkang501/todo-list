import { atom, selector } from "recoil";

export interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

//"TO_DO" | "DOING" | "DONE" 모두가 섞여서 들어가 있음
export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

//selector를 이용해 todo 분류
//모든걸 한번에 렌더링
export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({ get }) => {
      const toDos = get(toDoState);
      const category = get(categoryState);
      return toDos.filter((toDo) => toDo.category === category)
        //카테고리에 따라 하나의 배열만 반환하도록 수정
        // toDos.filter((toDo) => toDo.category === "TO_DO"),
        // toDos.filter((toDo) => toDo.category === "DOING"),
        // toDos.filter((toDo) => toDo.category === "DONE"),
    },
});

//사용자가 현재 선택한 카테고리 저장, 원하는 카테고리의 toDo만 보이게,
export const categoryState = atom({
  key: "category",
  default: "TO_DO",
});
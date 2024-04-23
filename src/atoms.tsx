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
      return [
        toDos.filter((toDo) => toDo.category === "TO_DO"),
        toDos.filter((toDo) => toDo.category === "DOING"),
        toDos.filter((toDo) => toDo.category === "DONE"),
      ];
    },
});

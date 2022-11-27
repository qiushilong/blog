import { IUserInfo, ITodoItem } from "@/types/home";
import request from "@/util/request";

export async function postLogin(payload: {
  account: string;
  password: string;
}) {
  return await request.post<IUserInfo>("/login", payload);
}

export async function fetchUserInfo() {
  return await request.get<IUserInfo>("/user/info");
}

export async function fetchTodoList() {
  return await request.get<ITodoItem[]>("/todoList/info");
}

export async function updateTodoList(payload: {
  id: number;
  finished: boolean;
}) {
  return await request.post<null>("/todoList/update", payload);
}

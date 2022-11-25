import type { IUserInfo } from "@/types/user";
import request from "@/util/request";

export async function postLogin(payload: {
  account: string;
  password: string;
}) {
  return await request.post<null>("/login", payload);
}

export async function fetchUserInfo() {
  return await request.get<IUserInfo>("/user/info");
}

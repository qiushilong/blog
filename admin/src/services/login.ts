import request from "@/util/request";

export async function postLogin(payload: {
  account: string;
  password: string;
}) {
  return await request.post<null>("/login", payload);
}

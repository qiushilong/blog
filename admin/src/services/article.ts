import request from "@/util/request";
import { IArticle } from "@/types/article";

export async function fetchArticle() {
  return await request.get<IArticle[]>("/article/info");
}

export async function addArticle(payload: IArticle) {
  return await request.post<IArticle>("/article/add", payload);
}

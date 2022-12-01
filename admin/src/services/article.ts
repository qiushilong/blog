import qs from "qs";
import request from "@/util/request";
import { IArticle } from "@/types/article";
import { IPageInfo } from "@/types/pageInfo";

interface IArticleReturn {
  list: IArticle[];
  total: number;
}

interface IQuery {
  title?: string;
}

export async function fetchArticle(payload: Omit<IPageInfo, "total"> & IQuery) {
  return await request.post<IArticleReturn>("/article/info", payload);
}

export async function addArticle(payload: IArticle) {
  return await request.post<IArticle>("/article/add", payload);
}

export async function deleteArticle(payload: { id: number }) {
  return await request.post<IArticle>("/article/delete", payload);
}

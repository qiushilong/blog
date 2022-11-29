import request from "@/util/request";
import { IColumn } from "@/types/column";

export async function fetchColumn() {
  return await request.post<IColumn[]>("/specialColumn/info");
}

export async function addColumn(payload: FormData) {
  return await request.post<null>("/specialColumn/add", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

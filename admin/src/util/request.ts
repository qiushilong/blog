import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { createDiscreteApi } from "naive-ui";
const { message } = createDiscreteApi(["message"]);

interface IResponse<T> {
  code: number;
  msg: string;
  data: T;
}

const instance = axios.create({
  baseURL: "http://127.0.0.1:3000",
  timeout: 10000,
  headers: {},
});

instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    return response;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    const { code, msg } = error.response.data;
    message.error(`${code}: ${msg}`);
    return Promise.reject(error);
  }
);

async function get<T>(
  url: string,
  config?: AxiosRequestConfig<any> | undefined
) {
  let result: AxiosResponse<IResponse<T>, any> | undefined = undefined;
  try {
    result = await instance.get(url, config);
  } catch (error) {
    console.error(`get 请求异常：${error}`);
  }
  return result;
}

async function post<T>(
  url: string,
  payload: any,
  config?: AxiosRequestConfig<any> | undefined
) {
  let result: AxiosResponse<IResponse<T>, any> | undefined = undefined;
  try {
    result = await instance.post(url, payload, config);
  } catch (error) {
    console.error(`post 请求异常：${error}`);
  }
  console.log("result", result);
  return result;
}

export default {
  get,
  post,
};

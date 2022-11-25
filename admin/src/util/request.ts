import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { createDiscreteApi } from "naive-ui";
const { message, notification, dialog, loadingBar } = createDiscreteApi(
  ["message", "dialog", "notification", "loadingBar"]
  // {
  //   configProviderProps: configProviderPropsRef
  // }
);

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

async function get<T>(
  url: string,
  config?: AxiosRequestConfig<any> | undefined
) {
  let result: AxiosResponse<IResponse<T>, any> | {} = {};
  try {
    result = await instance.get(url, config);
    console.log("result", result);
    const { code, data, msg } = (result as AxiosResponse<IResponse<T>, any>)
      .data;
    if (code !== 200) {
      console.log("demo");
      message.info(msg);
    }
  } catch (error) {
    console.error(`get 请求异常：${error}`);
  }

  return result;
}

function post<T>(
  url: string,
  data: any,
  config?: AxiosRequestConfig<any> | undefined
) {
  instance
    .post(url, data, config)
    .then((result: AxiosResponse<IResponse<T>, any>) => {
      const { code, data, msg } = result.data;
      if (code !== 200) {
        // message.error(msg);
      }
    })
    .catch((error) => {
      console.error(`post 请求异常：${error}`);
    });
}

export default {
  get,
  post,
};

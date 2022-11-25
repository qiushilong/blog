interface IStorageOptions {
  type?: "local" | "session";
}

export function setItem(key: string, value: string, options?: IStorageOptions) {
  const storage = options?.type === "session" ? sessionStorage : localStorage;
  storage.setItem(key, value);
}

export function getItem(key: string, options?: IStorageOptions) {
  const storage = options?.type === "session" ? sessionStorage : localStorage;
  return storage.getItem(key);
}

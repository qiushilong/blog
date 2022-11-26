// 用户信息类型
export interface IUserInfo {
  id: number;
  account: string;
  avatar: string;
  lastLoginAddress: string;
  lastLoginTime: string;
  name: string;
  phone: string;
  role: string;
  motto: string;
}

// todo 列表类型
export interface ITodoItem {
  id: number;
  content: string;
  createDate: string;
  updateDate: string;
  finished: boolean;
}

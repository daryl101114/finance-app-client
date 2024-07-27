import { AxiosResponse } from 'axios';
export interface IUser {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface ILoginUser {
  username: string;
  password: string;
}
export interface IPostUser {
  (user: IUser): void;
}
export interface IGetUserResponse {
  data: IUser[];
}

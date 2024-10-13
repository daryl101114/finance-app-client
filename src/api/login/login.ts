import { IUser, ILoginUser } from '../../configs/types/User';
import axios, { AxiosResponse } from 'axios';
export const registerUser = async (user: IUser): Promise<AxiosResponse> => {
  try {
    const res: AxiosResponse = await axios.post(
      'http://localhost:4000/api/registerUser',
      user,
    );
    return JSON.parse(JSON.stringify(res));
  } catch (error: any) {
    console.error(error);
    throw new Error('Register user failed!');
  }
};

export const loginUser = async (user: ILoginUser): Promise<AxiosResponse> => {
  try {
    const res: AxiosResponse = await axios.post(
      'https://localhost:7126/api/Authentication/authenticate',
      user,
    );
    return JSON.parse(JSON.stringify(res));
  } catch (err: any) {
    console.error('@LoginUser: ', err);
    localStorage.clear();
    throw new Error('Login Failed');
  }
};

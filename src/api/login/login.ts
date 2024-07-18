import { IUser } from '@/configs/types/User.ts';
import axios, { AxiosResponse } from 'axios';
const registerUser = async (user: IUser): Promise<AxiosResponse> => {
  try {
    const res: AxiosResponse = await axios.post(
      'http://localhost:4000/api/registerUser',
      user,
    );
    console.log(res);
    return res;
  } catch (error: any) {
    console.error(error);
    throw new Error('Register user failed!');
  }
};

export default registerUser;

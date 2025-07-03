import axiosInstance from '@/shared/api/axiosInstance';
import type { AxiosInstance } from 'axios';
import type { signinType, signupType, userType } from '../model/userType';
import { authApiResponseSchema } from '../model/userSchema';

class UserService {
  constructor(private readonly client: AxiosInstance) {}

  //   регистрация
  async signup(data: signupType): Promise<userType> {
    const response = await this.client.post('/auth/signup', data);
    return authApiResponseSchema.parse(response.data).user;
  }

  // вход
  async signin(data: signinType): Promise<userType> {
    const response = await this.client.post('/auth/signin', data);
    return authApiResponseSchema.parse(response.data).user;
  }
  // refresh

  async refresh(): Promise<userType> {
    const response = await this.client.get('/auth/refresh');
    return authApiResponseSchema.parse(response.data).user;
  }

  // выход
  async logout(): Promise<null> {
    await this.client.post('/auth/logout');
    return null;
  }
}

export default new UserService(axiosInstance);

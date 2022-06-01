import { api } from '../api/axios';
import { AxiosResponse } from 'axios';
import { SignInPayloadType, SignUpPayloadType } from '../types/requestTypes';
import { UserType } from '../types/responseTypes';


export const authService = {
  endpoints: {
    login: '/auth/login',
    checkAuth: '/auth/me',
    register: '/auth/register',
  },
  async login(payload: SignInPayloadType): Promise<AxiosResponse<UserType>> {
    return await api.post<SignInPayloadType, AxiosResponse<UserType>>(
      this.endpoints.login,
      payload,
    );
  },
  async register(payload: SignUpPayloadType): Promise<AxiosResponse> {
    return await api.post<SignUpPayloadType, AxiosResponse>(
      this.endpoints.register,
      payload,
    );
  },
  async checkAuth(payload: Record<string, unknown> = {}): Promise<AxiosResponse<UserType>> {
    return await api.post<Record<string, unknown>, AxiosResponse<UserType>>(
      this.endpoints.checkAuth,
      payload,
    )
  }
};

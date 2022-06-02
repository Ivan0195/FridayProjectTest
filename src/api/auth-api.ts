import { api } from './axios';
import {
  ResetPasswordPayloadType,
  SignInPayloadType,
  SignUpPayloadType,
  UpdatingProfilePayloadType
} from '../types/requestTypes';
import { AxiosResponse } from 'axios';
import { UserResponseType, ResetPasswordResponseType } from '../types/responseTypes';
import { AnyObjectType } from '../types/common';

export const authApi = {
  endpoints: {
    register: '/auth/register',
    login: '/auth/login',
    me: '/auth/me',
    forgot: '/auth/forgot',
  },
  register(payload: SignUpPayloadType): Promise<AxiosResponse> {
    return api.post<SignUpPayloadType, AxiosResponse>(
      this.endpoints.register,
      payload,
    );
  },
  login(payload: SignInPayloadType) {
    return api.post<SignInPayloadType, AxiosResponse<UserResponseType>>(this.endpoints.login, payload)
  },
  logout() {
    return api.delete(this.endpoints.me)
  },
  me() {
    return api.post<AnyObjectType, AxiosResponse<UserResponseType>>(this.endpoints.me, {})
  },
  updateMe(payload: UpdatingProfilePayloadType) {
    return api.put<UpdatingProfilePayloadType, AxiosResponse<UserResponseType>>(this.endpoints.me, payload)
  },
  resetPassword(payload: ResetPasswordPayloadType) {
    return api.post<ResetPasswordPayloadType, AxiosResponse<ResetPasswordResponseType>>(this.endpoints.forgot, payload)
  },
};

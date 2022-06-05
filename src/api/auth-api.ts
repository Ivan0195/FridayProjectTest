import { api } from './axios';
import {
  NewPasswordPayloadType,
  ResetPasswordPayloadType,
  SignInPayloadType,
  SignUpPayloadType,
  UpdatingProfilePayloadType
} from '../types/requestTypes';
import { AxiosResponse } from 'axios';
import {UserResponseType, ResetPasswordResponseType, NewPasswordResponseType} from '../types/responseTypes';
import { AnyObjectType } from '../types/common';

export const authApi = {
  endpoints: {
    register: '/auth/register',
    login: '/auth/login',
    me: '/auth/me',
    forgot: '/auth/forgot',
    setNewPassword: '/auth/set-new-password',
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
  newPassword(payload: NewPasswordPayloadType) {
    return api.post<NewPasswordPayloadType, AxiosResponse<NewPasswordResponseType>>(this.endpoints.setNewPassword, payload)
  },
};

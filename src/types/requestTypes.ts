export type SignUpPayloadType = {
  email: string;
  password: string;
};

export type SignInPayloadType = SignUpPayloadType & {
  rememberMe: boolean;
};

export type UpdatingProfilePayloadType = {
  name?: string
  avatar?: string
};

export type ResetPasswordPayloadType = {
  email: string;
  from: string;
  message: string;
};
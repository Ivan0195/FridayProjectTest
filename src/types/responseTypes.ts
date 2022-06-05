export type ErrorResponseType = {
  error?: string | null;
};

export type UserResponseType = {
  _id: string
  email: string
  name: string
  avatar?: string
  publicCardPacksCount: number
  created: Date
  updated: Date
  isAdmin: boolean
  verified: boolean
  rememberMe: boolean
  error?: string
};

export type ResetPasswordResponseType = {
  info: string;
  error: string;
};

export type NewPasswordResponseType = {
  info: string
  error: string;
}


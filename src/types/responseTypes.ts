export type ErrorResponseType = {
  error?: string | null;
};

export type UserType = {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  publicCardPacksCount: number;
  created: Date;
  updated: Date;
  isAdmin: boolean;
  verified: boolean;
  rememberMe: boolean;
};

export type CheckAuthResponseType = ErrorResponseType | {
  updatedUser: UserType;
};

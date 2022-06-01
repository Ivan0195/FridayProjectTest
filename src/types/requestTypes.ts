export type SignUpPayloadType = {
  email: string;
  password: string;
};

export type SignInPayloadType = SignUpPayloadType & {
  remeberMe: boolean;
};

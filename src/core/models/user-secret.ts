export interface UserSecretCreation {
  readonly idToken: string;
}

export interface UserSecret {
  readonly accessToken: string;
  readonly refreshToken: string;
}

export type UserRefreshSecret = Pick<UserSecret, "refreshToken">;

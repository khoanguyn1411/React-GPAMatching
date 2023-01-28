export interface UserSecretDto {
  readonly accessToken: string;
  readonly refreshToken: string;
}

export interface UserSecretCreationDto {
  readonly id_token: string;
}

export type UserRefreshSecretDto = Pick<UserSecretDto, "refreshToken">;

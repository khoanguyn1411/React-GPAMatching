export interface UserSecretDto {
  readonly accessToken: string;
  readonly refreshToken: string;
}

export interface UserSecretCreationDto {
  readonly tokenId: string;
}

export type UserRefreshSecretDto = Pick<UserSecretDto, "refreshToken">;

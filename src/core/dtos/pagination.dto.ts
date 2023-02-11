export type PaginationDto<T> = {
  readonly next: string | null;
  readonly posts: readonly T[];
};

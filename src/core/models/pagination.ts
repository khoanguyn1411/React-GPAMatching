export class Pagination<T> implements PaginationInit<T> {
  public readonly result: readonly T[];
  public readonly nextPageUrl: string | null;
  public constructor(data: PaginationInit<T>) {
    this.result = data.result;
    this.nextPageUrl = data.nextPageUrl;
  }

  public get hasNext() {
    return this.nextPageUrl != null;
  }
  public static readonly DEFAULT_PAGINATION_LIMIT = 10;
  public static readonly DEFAULT_PAGINATION_PAGE = 11;
}

interface PaginationInit<T> {
  readonly result: readonly T[];
  readonly nextPageUrl: string | null;
}

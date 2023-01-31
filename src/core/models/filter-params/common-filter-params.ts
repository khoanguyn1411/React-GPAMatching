export namespace CommonFilterParams {
  export interface Pagination {
    readonly page: number;
    readonly limit: number;
  }
  export interface Search {
    readonly search: string | null;
  }
  export type Combined = Pagination & Search;
}

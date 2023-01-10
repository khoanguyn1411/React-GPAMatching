export namespace CommonFilterParams {
  export interface Pagination {
    readonly page: number;
    readonly limit: number;
  }
  export interface Search {
    readonly search: string;
  }
  export type Combined = Pagination & Search;
}

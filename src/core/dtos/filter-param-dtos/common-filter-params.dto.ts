export namespace CommonFilterParamsDto {
  export interface PaginationDto {
    readonly page: number;
    readonly limit: number;
  }
  export interface SearchDto {
    readonly search: string | undefined;
  }
  export type Combined = PaginationDto & SearchDto;
}

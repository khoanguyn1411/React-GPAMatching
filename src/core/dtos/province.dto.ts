export interface ProvinceDto {
  readonly name: string;
  readonly code: number;
  readonly division_type: string;
  readonly codename: string;
  readonly phone_code: number;
  readonly districts: readonly unknown[];
}

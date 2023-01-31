import { DateUtils } from "@/utils/funcs/date-utils";

class DateMapper {
  public fromDto(dto: string): Date {
    return new Date(dto);
  }

  public toDto(model: Date): string {
    return DateUtils.toFormat(model, "API");
  }
}

export const dateMapper = new DateMapper();

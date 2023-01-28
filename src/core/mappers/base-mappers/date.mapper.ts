import { DateUtils } from "@/utils/funcs/date-utils";

class DateMapper {
  public fromDto(dto: string | undefined): string {
    return dto ? DateUtils.toFormat(dto, "US") : "";
  }

  public toDto(model: string | null | undefined): string | undefined {
    return model ? DateUtils.toFormat(model, "API") : undefined;
  }
}

export const dateMapper = new DateMapper();

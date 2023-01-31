import { ProjectFieldDto } from "../project-field.dto";
import { CommonFilterParamsDto } from "./common-filter-params.dto";

export interface ProjectFilterParamsDto extends CommonFilterParamsDto.Combined {
  readonly skill: string | undefined;
  readonly field: ProjectFieldDto | undefined;
}

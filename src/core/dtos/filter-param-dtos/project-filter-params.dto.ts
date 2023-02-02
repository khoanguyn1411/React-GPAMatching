import { ProjectFieldDto } from "../project-field.dto";
import { CommonFilterParamsDto } from "./common-filter-params.dto";

export interface ProjectFilterParamsDto extends CommonFilterParamsDto.Combined {
  readonly seekingSkills: string | undefined;
  readonly category: ProjectFieldDto | undefined;
}

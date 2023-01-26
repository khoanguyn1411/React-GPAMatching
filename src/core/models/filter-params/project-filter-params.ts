import { CommonFilterParams } from "@/core/models/filter-params/common-filter-params";

import { ProjectField } from "../project-field";
import { Skill } from "../skills";

export interface ProjectFilterParams extends CommonFilterParams.Combined {
  readonly skill: readonly Skill[];
  readonly field: ProjectField;
}

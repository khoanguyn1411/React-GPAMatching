import { CommonFilterParams } from "@/core/models/filter-params/common-filter-params";

import { ProjectField } from "../project-field";

export interface ProjectFilterParams extends CommonFilterParams.Combined {
  readonly skill: string | null;
  readonly field: ProjectField | null;
}

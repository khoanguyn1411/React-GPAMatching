import { ProjectFilterParamsDto } from "@/core/dtos/filter-param-dtos/project-filter-params.dto";
import { ProjectFilterParams } from "@/core/models/filter-params/project-filter-params";
import { Skill } from "@/core/models/skills";

import { IMapperToDto } from "../base-mappers/mapper";
import { projectFieldMapper } from "../project-field.mapper";
import { skillMapper } from "../skill.mapper";
import { commonFilterParamsMapper } from "./common-filter-params.mapper";

class ProjectFilterParamsMapper
  implements IMapperToDto<ProjectFilterParamsDto, ProjectFilterParams>
{
  public toDto(data: ProjectFilterParams): ProjectFilterParamsDto {
    return {
      ...commonFilterParamsMapper.toDto(data),
      seekSkills: data.skill
        ? data.skill
            .split(",")
            .map((skill) => skillMapper.toDto(skill as Skill))
            .join(",")
        : undefined,
      category: data.field ? projectFieldMapper.toDto(data.field) : undefined,
    };
  }
}

export const projectFilterParamsMapper = new ProjectFilterParamsMapper();

import { ProjectDto } from "../dtos/project.dto";
import { Project } from "../models/project";
import { Skill } from "../models/skills";
import { dateMapper } from "./base-mappers/date.mapper";
import { IMapperFromDto } from "./base-mappers/mapper";
import { projectFieldMapper } from "./project-field.mapper";
import { projectStatusMapper } from "./project-status.mapper";

class ProjectMapper implements IMapperFromDto<ProjectDto, Project> {
  public fromDto(data: ProjectDto): Project {
    return {
      id: data._id,
      agreeWithPolicy: data.aggreeWithPolicy,
      name: data.title,
      createdAt: dateMapper.fromDto(data.createdAt),
      createdBy: data.createdBy,
      description: data.content,
      field: projectFieldMapper.fromDto(data.category),
      status: projectStatusMapper.fromDto(data.currentStage),
      followers: data.interesters,
      lastModifiedBy: data.lastModifiedBy,
      currentMemberQuantity: data.currentMemberCount.toString(),
      findingMemberQuantity: data.seekingMemberCount.toString(),
      requiredSkills: data.seekingSkills as readonly Skill[],
      updateAt: data.updatedAt ? dateMapper.fromDto(data.updatedAt) : null,
    };
  }
}

export const projectMapper = new ProjectMapper();

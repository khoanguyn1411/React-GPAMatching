import { ProjectCreationDto, ProjectDto } from "../dtos/project.dto";
import { Project, ProjectCreation } from "../models/project";
import { dateMapper } from "./base-mappers/date.mapper";
import { IMapperFromDto, IMapperToCreationDto } from "./base-mappers/mapper";
import { projectFieldMapper } from "./project-field.mapper";
import { projectStatusMapper } from "./project-status.mapper";
import { skillMapper } from "./skill.mapper";
import { userShortMapper } from "./user-short.mapper";

class ProjectMapper
  implements
    IMapperFromDto<ProjectDto, Project>,
    IMapperToCreationDto<ProjectCreationDto, ProjectCreation>
{
  public toCreationDto(data: ProjectCreation): ProjectCreationDto {
    return {
      aggreeWithPolicy: true,
      title: data.name,
      content: data.description,
      category: projectFieldMapper.toDto(data.field),
      currentStage: projectStatusMapper.toDto(data.status),
      currentMemberCount: Number(data.currentMemberQuantity),
      seekingMemberCount: Number(data.findingMemberQuantity),
      seekingSkills: data.requiredSkills.map((skill) => skillMapper.toDto(skill)),
    };
  }
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
      requiredSkills: data.seekingSkills.map((skill) => skillMapper.fromDto(skill)),
      updateAt: data.updatedAt ? dateMapper.fromDto(data.updatedAt) : null,
      team: {
        members: data.team.members,
        leader: data.team.leader ? userShortMapper.fromDto(data.team.leader) : null,
      },
    };
  }
}

export const projectMapper = new ProjectMapper();

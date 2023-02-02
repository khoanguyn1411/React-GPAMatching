import { ProjectDetailDto } from "../dtos/project.dto";
import { ProjectDetail } from "../models/project";
import { dateMapper } from "./base-mappers/date.mapper";
import { IMapperFromDto } from "./base-mappers/mapper";
import { projectFieldMapper } from "./project-field.mapper";
import { projectStatusMapper } from "./project-status.mapper";
import { skillMapper } from "./skill.mapper";
import { userShortMapper } from "./user-short.mapper";

class ProjectDetailMapper implements IMapperFromDto<ProjectDetailDto, ProjectDetail> {
  public fromDto(data: ProjectDetailDto): ProjectDetail {
    return {
      id: data._id,
      agreeWithPolicy: data.aggreeWithPolicy,
      name: data.title,
      createdAt: dateMapper.fromDto(data.createdAt),
      createdBy: data.createdBy,
      description: data.content,
      field: projectFieldMapper.fromDto(data.category),
      status: projectStatusMapper.fromDto(data.currentStage),
      followers: data.interesters.map((request) => userShortMapper.fromDto(request)),
      lastModifiedBy: data.lastModifiedBy,
      currentMemberQuantity: data.currentMemberCount.toString(),
      findingMemberQuantity: data.seekingMemberCount.toString(),
      requiredSkills: data.seekingSkills.map((skill) => skillMapper.fromDto(skill)),
      updateAt: data.updatedAt ? dateMapper.fromDto(data.updatedAt) : null,
      team: {
        members: data.team.members.map((member) => userShortMapper.fromDto(member)),
        leader: data.team.leader ? userShortMapper.fromDto(data.team.leader) : null,
      },
    };
  }
}

export const projectDetailMapper = new ProjectDetailMapper();

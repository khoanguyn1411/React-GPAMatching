import { ProjectByUserDto } from "../dtos/project-by-user.dto";
import { ProjectByUser } from "../models/project-by-user";
import { IMapperFromDto } from "./base-mappers/mapper";
import { projectMapper } from "./project.mapper";
import { projectDetailMapper } from "./project-detail.mapper";

class ProjectByUserMapper implements IMapperFromDto<ProjectByUserDto, ProjectByUser> {
  public fromDto(data: ProjectByUserDto): ProjectByUser {
    return {
      ownedProject: data.ownPost ? projectDetailMapper.fromDto(data.ownPost) : null,
      joinedProjects: data.joiningPosts.map((project) => projectMapper.fromDto(project)),
      requestedProjects: data.interestingPosts.map((project) => projectMapper.fromDto(project)),
    };
  }
}

export const projectByUserMapper = new ProjectByUserMapper();

import { ProjectDetailDto, ProjectDto } from "./project.dto";

export interface ProjectByUserDto {
  readonly ownPost: ProjectDetailDto | null;
  readonly interestingPosts: readonly ProjectDto[];
  readonly joiningPosts: readonly ProjectDto[];
}

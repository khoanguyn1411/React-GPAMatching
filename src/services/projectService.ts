import { http } from "@/api/api-core";
import { ProjectDetailDto, ProjectDto } from "@/core/dtos/project.dto";
import { ProjectByUserDto } from "@/core/dtos/project-by-user.dto";
import { projectFilterParamsMapper } from "@/core/mappers/filter-param-mappers/project-filter-params.mapper";
import { interestMapper } from "@/core/mappers/interest.mapper";
import { projectMapper } from "@/core/mappers/project.mapper";
import { projectByUserMapper } from "@/core/mappers/project-by-user.mapper";
import { projectDetailMapper } from "@/core/mappers/project-detail.mapper";
import { ProjectFilterParams } from "@/core/models/filter-params/project-filter-params";
import { Interest } from "@/core/models/interest";
import { Project, ProjectCreation, ProjectDetail } from "@/core/models/project";
import { User } from "@/core/models/user";
import { ComposeUrlService } from "@/utils/funcs/compose-url";

export namespace ProjectService {
  const projectUrlService = new ComposeUrlService("feed");
  export async function getProjects(params: ProjectFilterParams): Promise<readonly Project[]> {
    const projectUrl = projectUrlService.getBaseUrl();
    const paramsDto = projectFilterParamsMapper.toDto(params);
    const result = await http.get<readonly ProjectDto[]>(projectUrl, { params: paramsDto });
    return result.data.map((project) => projectMapper.fromDto(project));
  }

  export async function getProjectById(id: Project["id"]): Promise<ProjectDetail | null> {
    const url = projectUrlService.constructUrlWithParam(id);
    const result = await http.get<ProjectDetailDto>(url);
    return projectDetailMapper.fromDto(result.data);
  }

  export async function createProject(data: ProjectCreation) {
    const url = projectUrlService.getBaseUrl();
    const dataDto = projectMapper.toCreationDto(data);
    const result = await http.post<ProjectDto>(url, dataDto);
    return projectMapper.fromDto(result.data);
  }

  export async function deleteProject(projectId: Project["id"]) {
    const url = projectUrlService.constructUrlWithParam(projectId);
    return http.delete(url);
  }

  export async function performUserAction(data: Interest) {
    const url = projectUrlService.concatWith(["interest"]);
    const dataDto = interestMapper.toDto(data);
    return http.put(url, dataDto);
  }

  export async function getProjectByUser(userId: User["id"]) {
    const url = projectUrlService.concatWith(["user", userId]);
    const result = await http.get<ProjectByUserDto>(url);
    return projectByUserMapper.fromDto(result.data);
  }
}

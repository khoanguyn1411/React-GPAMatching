import { http } from "@/api/api-core";
import { composeHttpMethodResult } from "@/api/api-utilities";
import { ProjectDetailDto, ProjectDto } from "@/core/dtos/project.dto";
import { projectFilterParamsMapper } from "@/core/mappers/filter-param-mappers/project-filter-params.mapper";
import { projectMapper } from "@/core/mappers/project.mapper";
import { projectDetailMapper } from "@/core/mappers/project-detail.mapper";
import { ProjectFilterParams } from "@/core/models/filter-params/project-filter-params";
import { Project, ProjectCreation, ProjectDetail } from "@/core/models/project";
import { ComposeUrlService } from "@/utils/funcs/compose-url";

export namespace ProjectService {
  const projectUrlService = new ComposeUrlService("feed");
  export async function getProjects(params: ProjectFilterParams): Promise<readonly Project[]> {
    const projectUrl = projectUrlService.getBaseUrl();
    const paramsDto = projectFilterParamsMapper.toDto(params);
    const method = http.get<readonly ProjectDto[]>(projectUrl, { params: paramsDto });
    const result = await composeHttpMethodResult(method);
    if (result.result_dto == null) {
      return [];
    }
    return result.result_dto.map((project) => projectMapper.fromDto(project));
  }

  export async function getProjectById(id: Project["id"]): Promise<ProjectDetail | null> {
    const url = projectUrlService.constructUrlWithParam(id);
    const method = http.get<ProjectDetailDto>(url);
    const result = await composeHttpMethodResult(method);
    if (result.result_dto == null) {
      return null;
    }
    return projectDetailMapper.fromDto(result.result_dto);
  }

  export async function createProject(data: ProjectCreation) {
    const url = projectUrlService.getBaseUrl();
    const dataDto = projectMapper.toCreationDto(data);
    const method = http.post<ProjectDto>(url, dataDto);
    return await composeHttpMethodResult(method);
  }
}

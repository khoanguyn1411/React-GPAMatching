import { http } from "@/api/api-core";
import { composeHttpMethodResult } from "@/api/api-utilities";
import { ProjectDto } from "@/core/dtos/project.dto";
import { projectMapper } from "@/core/mappers/project.mapper";
import { Project } from "@/core/models/project";
import { ComposeUrlService } from "@/utils/funcs/compose-url";

export namespace ProjectService {
  const projectUrlService = new ComposeUrlService("feed");
  export async function getProjects(): Promise<readonly Project[]> {
    const projectUrl = projectUrlService.getBaseUrl();
    const method = http.get<readonly ProjectDto[]>(projectUrl);
    const result = await composeHttpMethodResult(method);
    if (result.result_dto == null) {
      return [];
    }
    return result.result_dto.map((project) => projectMapper.fromDto(project));
  }

  export async function getProjectById(id: Project["id"]): Promise<Project | null> {
    const url = projectUrlService.constructUrlWithParam(id);
    const method = http.get<ProjectDto>(url);
    const result = await composeHttpMethodResult(method);
    if (result.result_dto == null) {
      return null;
    }
    return projectMapper.fromDto(result.result_dto);
  }
}

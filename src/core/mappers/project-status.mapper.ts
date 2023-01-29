import { reverseRecord } from "@/utils/funcs/reverse-record";

import { ProjectStatusDto } from "../dtos/project-status.dto";
import { ProjectStatus } from "../models/project-status";
import { IMapper } from "./base-mappers/mapper";

const TO_PROJECT_STATUS_DTO: Readonly<Record<ProjectStatus, ProjectStatusDto>> = {
  [ProjectStatus.FinishedButNoProduct]: ProjectStatusDto.FinishedButNoProduct,
  [ProjectStatus.FinishedWithProduct]: ProjectStatusDto.FinishedWithProduct,
  [ProjectStatus.NotFinished]: ProjectStatusDto.NotFinished,
  [ProjectStatus.Other]: ProjectStatusDto.Other,
};

const FROM_PROJECT_STATUS_DTO = reverseRecord(TO_PROJECT_STATUS_DTO);

class ProjectStatusMapper implements IMapper<ProjectStatusDto, ProjectStatus> {
  public fromDto(data: ProjectStatusDto): ProjectStatus {
    return FROM_PROJECT_STATUS_DTO[data];
  }
  public toDto(data: ProjectStatus): ProjectStatusDto {
    return TO_PROJECT_STATUS_DTO[data];
  }
}

export const projectStatusMapper = new ProjectStatusMapper();

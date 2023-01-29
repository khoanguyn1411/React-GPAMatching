import { reverseRecord } from "@/utils/funcs/reverse-record";

import { ProjectFieldDto } from "../dtos/project-field.dto";
import { ProjectField } from "../models/project-field";
import { IMapper } from "./base-mappers/mapper";

const TO_PROJECT_FIELD_DTO: Readonly<Record<ProjectField, ProjectFieldDto>> = {
  [ProjectField.AgroforestryAndFishery]: ProjectFieldDto.AgroforestryAndFishery,
  [ProjectField.EducationAndMedican]: ProjectFieldDto.EducationAndMedican,
  [ProjectField.FinanceAndBanking]: ProjectFieldDto.FinanceAndBanking,
  [ProjectField.IndustryAndProduct]: ProjectFieldDto.IndustryAndProduct,
  [ProjectField.ScienceAndTechnology]: ProjectFieldDto.ScienceAndTechnology,
  [ProjectField.ServiceAndTourism]: ProjectFieldDto.ServiceAndTourism,
  [ProjectField.Other]: ProjectFieldDto.Other,
};

const FROM_PROJECT_FIELD_DTO = reverseRecord(TO_PROJECT_FIELD_DTO);

class ProjectFieldMapper implements IMapper<ProjectFieldDto, ProjectField> {
  public fromDto(data: ProjectFieldDto): ProjectField {
    return FROM_PROJECT_FIELD_DTO[data];
  }
  public toDto(data: ProjectField): ProjectFieldDto {
    return TO_PROJECT_FIELD_DTO[data];
  }
}

export const projectFieldMapper = new ProjectFieldMapper();

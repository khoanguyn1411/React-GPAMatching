import { StrictOmit } from "@/utils/types/common";

import { ProjectFieldDto } from "./project-field.dto";
import { ProjectStatusDto } from "./project-status.dto";
import { SkillDto } from "./skill.dto";
import { UserDto, UserShortDto } from "./user.dto";

export interface ProjectDto {
  readonly aggreeWithPolicy: boolean;
  readonly category: ProjectFieldDto;
  readonly content: string;
  readonly createdAt: string;
  readonly createdBy: UserDto["_id"];
  readonly currentMemberCount: number;
  readonly seekingMemberCount: number;
  readonly currentStage: ProjectStatusDto;
  readonly interesters: readonly UserDto["_id"][];
  readonly lastModifiedBy: UserDto["_id"];
  readonly seekingSkills: readonly SkillDto[];
  readonly title: string;
  readonly updatedAt: string | undefined;
  readonly team: {
    members: readonly UserDto["_id"][];
    leader: UserShortDto;
  };
  readonly _id: string;
  readonly __v: number;
}

export type ProjectCreationDto = Pick<
  ProjectDto,
  | "seekingMemberCount"
  | "seekingSkills"
  | "aggreeWithPolicy"
  | "title"
  | "category"
  | "content"
  | "currentStage"
  | "currentMemberCount"
>;

export type ProjectDetailDto = StrictOmit<ProjectDto, "team"> & {
  readonly team: {
    members: readonly UserShortDto[];
    leader: UserShortDto;
  };
};

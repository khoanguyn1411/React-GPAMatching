import { ProjectFieldDto } from "./project-field.dto";
import { ProjectStatusDto } from "./project-status.dto";
import { UserProfileDto } from "./user.dto";

export interface ProjectDto {
  readonly aggreeWithPolicy: boolean;
  readonly category: ProjectFieldDto;
  readonly content: string;
  readonly createdAt: string;
  readonly createdBy: UserProfileDto["_id"];
  readonly currentMemberCount: number;
  readonly seekingMemberCount: number;
  readonly currentStage: ProjectStatusDto;
  readonly interesters: readonly UserProfileDto["_id"][];
  readonly lastModifiedBy: UserProfileDto["_id"];
  readonly seekingSkills: string[];
  readonly title: string;
  readonly updatedAt: string | undefined;
  readonly _id: string;
  readonly __v: number;
}

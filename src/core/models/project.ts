import { StrictOmit } from "@/utils/types/common";

import { IsReadyToJoin } from "./is-ready-to-join";
import { ProjectField } from "./project-field";
import { ProjectStatus } from "./project-status";
import { Skill } from "./skills";
import { User, UserShort } from "./user";

export interface Project {
  readonly id: string;
  readonly agreeWithPolicy: boolean;
  readonly name: string;
  readonly createdAt: Date;
  readonly createdBy: User["id"];
  readonly description: string;
  readonly field: ProjectField;
  readonly status: ProjectStatus;
  readonly followers: readonly User["id"][];
  readonly lastModifiedBy: User["id"];
  readonly currentMemberQuantity: string;
  readonly findingMemberQuantity: string;
  readonly requiredSkills: readonly Skill[];
  readonly updateAt: Date | null;
  readonly team: {
    members: readonly User["id"][];
    leader: UserShort;
  };
}

/** Using for initializing information. */
export type ProjectCreation = Pick<
  Project,
  | "name"
  | "description"
  | "field"
  | "status"
  | "currentMemberQuantity"
  | "findingMemberQuantity"
  | "requiredSkills"
> & {
  readonly readyToJoin: IsReadyToJoin.ThreeChoices;
};

export type ProjectDetail = StrictOmit<Project, "team"> & {
  readonly team: {
    members: readonly UserShort[];
    leader: UserShort;
  };
};

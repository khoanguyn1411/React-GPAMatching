import { IsReadyToJoin } from "./is-ready-to-join";
import { ProjectField } from "./project-field";
import { ProjectStatus } from "./project-status";
import { Skill } from "./skills";

export interface Project {
  readonly name: string;
  readonly description: string;
  readonly field: ProjectField;
  readonly status: ProjectStatus;
  readonly currentMemberQuantity: string;
  readonly findingMemberQuantity: string;
  readonly requiredSkills: readonly Skill[];
  readonly readyToJoin: IsReadyToJoin.ThreeChoices;
}

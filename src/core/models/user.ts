import { Gender } from "./gender";
import { Skill } from "./skills";

export interface User {
  readonly fullName: string;
  readonly email: string;
  readonly gender: Gender;
  readonly dateOfBirth: Date;
  readonly phoneNumber: string;
  readonly facebookUrl: string;
  readonly studyUnit: string;
  readonly year: string;
  readonly knownVia: string;
  readonly isReadyToJoin: boolean;
  readonly avatarUrl: string;
  readonly avatar: File;
}

export interface UserSkillSet {
  readonly skillSet: readonly Skill[];
}

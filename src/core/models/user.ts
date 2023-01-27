import { Gender } from "./gender";
import { UserSkillSet } from "./user-skill-set";

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
  readonly city: string;
  readonly avatar: File;
}

export type UserProfile = Pick<
  User,
  | "fullName"
  | "email"
  | "gender"
  | "dateOfBirth"
  | "phoneNumber"
  | "studyUnit"
  | "year"
  | "avatar"
  | "avatarUrl"
  | "city"
> &
  UserSkillSet;

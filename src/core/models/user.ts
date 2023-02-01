import { Gender } from "./gender";
import { IsReadyToJoin } from "./is-ready-to-join";
import { KnownVia } from "./known-via";
import { Project } from "./project";
import { UserSkillSet } from "./user-skill-set";
import { UserStudyYear } from "./user-study-year";

export type UserCreation = {
  readonly avatar?: File;
  readonly avatarUrl: string;
  readonly fullName: string;
  readonly phoneNumber: string;
  readonly socialLink: string;
  readonly email: string;
  readonly dob: Date;
  readonly gender: Gender;
  readonly yearOfStudent: UserStudyYear;
  readonly school: string;
  readonly homeAddress: string;
  readonly knownVia: KnownVia | null;
  readonly isReadyToJoin: boolean | null;
};

export interface UserWithNoIdea {
  readonly experience: string | null;
  readonly readyToJoin: IsReadyToJoin.ThreeChoices | null;
}

export interface UserFilledInformation {
  readonly isFilledInformation: boolean;
}

export type User = UserCreation &
  UserFilledInformation &
  UserSkillSet &
  UserWithNoIdea & { readonly id: string; readonly teamIds: readonly Project["id"][] };

export type UserShort = Pick<
  User,
  "avatarUrl" | "dob" | "fullName" | "gender" | "school" | "skillSet" | "yearOfStudent" | "id"
>;

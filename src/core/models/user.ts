import { StrictOmit } from "@/utils/types/common";

import { Gender } from "./gender";
import { KnownVia } from "./known-via";
import { UserSkillSet } from "./user-skill-set";
import { UserStudyYear } from "./user-study-year";
import { UserWithNoIdea } from "./user-with-no-idea";

export type UserCreation = Pick<UserProfile, "fullName" | "avatarUrl"> & {
  readonly avatar?: File;
  readonly phoneNumber: string;
  readonly socialLink: string;
  readonly email: string;
  readonly dob: Date;
  readonly gender: Gender;
  readonly yearOfStudent: UserStudyYear;
  readonly school: string;
  readonly homeAddress: string;
  readonly knownVia: KnownVia;
  readonly isReadyToJoin: boolean;
};

export interface UserFilledInformation {
  readonly isFilledInformation: boolean;
}

export interface UserProfile extends UserFilledInformation {
  readonly id: string;
  readonly avatarUrl: string;
  readonly createdAt: Date;
  readonly fullName: string;
  readonly email: string;
  readonly isAdmin: boolean;
  readonly isOrganizer: boolean;
  readonly isParticipant: boolean;
  readonly lastLogin: Date | null;
  readonly updatedAt: Date | null;
}

export type UserInformation = UserCreation & UserFilledInformation & UserSkillSet & UserWithNoIdea;
export type User = StrictOmit<UserInformation, "email">;

import { Gender } from "./gender";
import { KnownVia } from "./known-via";
import { Project } from "./project";
import { UserSkillSet } from "./user-skill-set";
import { UserStudyYear } from "./user-study-year";
import { UserWithNoIdea } from "./user-with-no-idea";

export type UserCreation = Pick<UserProfile, "fullName" | "avatarUrl"> & {
  readonly avatar?: File;
  readonly phoneNumber: string;
  readonly socialLink: string;
  readonly email: string;
  readonly googleId: string;
  readonly dob: Date;
  readonly gender: Gender;
  readonly yearOfStudent: UserStudyYear;
  readonly school: string;
  readonly homeAddress: string;
  readonly knownVia: KnownVia;
  readonly isReadyToJoin: boolean;
};

export interface UserProfile {
  readonly id: string;
  readonly avatarUrl: string;
  readonly createdAt: Date;
  readonly fullName: string;
  readonly isAdmin: boolean;
  readonly isFilledInformation: boolean;
  readonly isOrganizer: boolean;
  readonly isParticipant: boolean;
  readonly lastLogin: Date | null;
  readonly updatedAt: Date | null;
}

export type UserInformation = UserCreation &
  UserSkillSet & {
    project: Project | null;
    userWithNoIdea: UserWithNoIdea | null;
  };

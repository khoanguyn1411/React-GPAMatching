import { GenderDto } from "./gender.dto";
import { SkillDto } from "./skill.dto";
import { UserStudyYearDto } from "./user-study-year.dto";

export type UserCreationDto = Pick<UserProfileDto, "fullName" | "avatar" | "bio" | "skillsSet"> & {
  readonly phoneNumber: string;
  readonly socialLink: string;
  readonly email: string | undefined;
  readonly dob: string;
  readonly gender: GenderDto;
  readonly yearOfStudent: UserStudyYearDto;
  readonly school: string;
  readonly homeAddress: string;
  readonly willingToAttendOffline: string | undefined;
  readonly wayToKnow: string | undefined;
  readonly willingToJoinCompetition: string | undefined;
};

export interface UserProfileDto {
  readonly _id: string;
  readonly avatar: string;
  readonly bio: string;
  readonly createdAt: string;
  readonly fullName: string;
  readonly isAdmin: boolean;
  readonly isFilledInformation: boolean;
  readonly isOrganizer: boolean;
  readonly isParticipant: boolean;
  readonly lastLogin: string | null;
  readonly skillsSet: readonly SkillDto[];
  readonly updatedAt: string | null;
}

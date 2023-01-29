import { GenderDto } from "./gender.dto";
import { UserStudyYearDto } from "./user-study-year.dto";

export type UserCreationDto = Pick<
  UserProfileDto,
  | "fullName"
  | "avatar"
  | "bio"
  | "skillsSet"
  | "willingToAttendOffline"
  | "willingToJoinCompetition"
> & {
  readonly phoneNumber: string;
  readonly socialLink: string;
  readonly email: string;
  readonly googleId: string;
  readonly dob: string;
  readonly gender: GenderDto;
  readonly yearOfStudent: UserStudyYearDto;
  readonly school: string;
  readonly homeAddress: string;
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
  readonly skillsSet: readonly string[];
  readonly updatedAt: string | null;
  readonly willingToAttendOffline: string;
  readonly willingToJoinCompetition: string;
}

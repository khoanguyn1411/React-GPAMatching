import { GenderDto } from "./gender.dto";
import { UserStudyYearDto } from "./user-study-year.dto";

export interface UserCreationDto {
  readonly fullName: string;
  readonly gender: GenderDto;
  readonly dob: string;
  readonly email: string;
  readonly phoneNumber: string;
  readonly socialLink: string;
  readonly avatar: string;
  readonly yearOfStudent: UserStudyYearDto;
  readonly school: string;
  readonly homeAddress: string;
  readonly bio: string;
  readonly skillsSet: readonly string[];
  readonly googleId: string;
  readonly willingToAttendOffline: string;
  readonly willingToJoinCompetition: string;
}

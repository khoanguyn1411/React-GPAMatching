import { GenderDto } from "./gender.dto";
import { ProjectDto } from "./project.dto";
import { SkillDto } from "./skill.dto";
import { UserStudyYearDto } from "./user-study-year.dto";

export type UserDto = {
  readonly _id: string;
  readonly avatar: string;
  readonly bio: string;
  readonly createdAt: string;
  readonly fullName: string;
  readonly isAdmin: boolean;
  readonly isFilledInformation: boolean;
  readonly isParticipant: boolean;
  readonly lastLogin: string | null;
  readonly skillsSet: readonly SkillDto[];
  readonly updatedAt: string | null;
  readonly teamIds: readonly ProjectDto["_id"][];
  readonly phoneNumber: string;
  readonly socialLink: string;
  readonly dob: string;
  readonly gender: GenderDto;
  readonly yearOfStudent: UserStudyYearDto;
  readonly school: string;
  readonly homeAddress: string;
  readonly willingToAttendOffline: string;
  readonly wayToKnow: string;
  readonly willingToJoinCompetition: string;
};

export type UserCreationDto = Pick<
  UserDto,
  | "fullName"
  | "isFilledInformation"
  | "avatar"
  | "skillsSet"
  | "phoneNumber"
  | "dob"
  | "gender"
  | "yearOfStudent"
  | "school"
  | "homeAddress"
> & {
  readonly socialLink: string | undefined;
  readonly bio: string | undefined;
  readonly willingToAttendOffline: string | undefined;
  readonly wayToKnow: string | undefined;
  readonly willingToJoinCompetition: string | undefined;
};

export type UserShortDto = Pick<
  UserDto,
  "avatar" | "dob" | "fullName" | "gender" | "school" | "skillsSet" | "yearOfStudent" | "_id"
>;

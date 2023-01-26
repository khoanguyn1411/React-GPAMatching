import { Gender } from "./gender";

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

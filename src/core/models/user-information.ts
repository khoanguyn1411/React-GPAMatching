import { Project } from "./project";
import { User, UserSkillSet } from "./user";
import { UserWithNoIdea } from "./user-with-no-idea";

export type UserInformation = User &
  UserSkillSet & {
    project: Project | null;
    userWithNoIdea: UserWithNoIdea | null;
  };

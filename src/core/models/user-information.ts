import { Project } from "./project";
import { User } from "./user";
import { UserSkillSet } from "./user-skill-set";
import { UserWithNoIdea } from "./user-with-no-idea";

export type UserInformation = User &
  UserSkillSet & {
    project: Project | null;
    userWithNoIdea: UserWithNoIdea | null;
  };

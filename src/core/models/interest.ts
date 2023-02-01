import { InterestAction } from "./interest-action";
import { Project } from "./project";
import { User } from "./user";

export interface Interest {
  readonly userId: User["id"];
  readonly projectId: Project["id"];
  readonly action: InterestAction;
}

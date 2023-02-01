import { InterestActionDto } from "./interest-action.dto";
import { ProjectDto } from "./project.dto";
import { UserDto } from "./user.dto";

export interface InterestDto {
  readonly interesterId: UserDto["_id"];
  readonly postId: ProjectDto["_id"];
  readonly action: InterestActionDto;
}

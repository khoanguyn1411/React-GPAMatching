import { InterestDto } from "../dtos/interest.dto";
import { Interest } from "../models/interest";
import { IMapper } from "./base-mappers/mapper";
import { interestActionMapper } from "./interest-action.mapper";

class InterestMapper implements IMapper<InterestDto, Interest> {
  public fromDto(data: InterestDto): Interest {
    return {
      userId: data.interesterId,
      projectId: data.postId,
      action: interestActionMapper.fromDto(data.action),
    };
  }
  public toDto(data: Interest): InterestDto {
    return {
      interesterId: data.userId,
      postId: data.projectId,
      action: interestActionMapper.toDto(data.action),
    };
  }
}

export const interestMapper = new InterestMapper();

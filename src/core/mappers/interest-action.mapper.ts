import { reverseRecord } from "@/utils/funcs/reverse-record";

import { InterestActionDto } from "../dtos/interest-action.dto";
import { InterestAction } from "../models/interest-action";
import { IMapper } from "./base-mappers/mapper";

const TO_INTEREST_ACTION_DTO: Readonly<Record<InterestAction, InterestActionDto>> = {
  [InterestAction.Approve]: InterestActionDto.Approve,
  [InterestAction.Decline]: InterestActionDto.Decline,
  [InterestAction.Interested]: InterestActionDto.Interested,
  [InterestAction.Uninterested]: InterestActionDto.Uninterested,
};

const FROM_INTEREST_ACTION_DTO = reverseRecord(TO_INTEREST_ACTION_DTO);

class InterestActionMapper implements IMapper<InterestActionDto, InterestAction> {
  public fromDto(data: InterestActionDto) {
    return FROM_INTEREST_ACTION_DTO[data];
  }
  public toDto(data: InterestAction): InterestActionDto {
    return TO_INTEREST_ACTION_DTO[data];
  }
}

export const interestActionMapper = new InterestActionMapper();

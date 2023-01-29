import { reverseRecord } from "@/utils/funcs/reverse-record";

import { SkillDto } from "../dtos/skill.dto";
import { Skill } from "../models/skills";
import { IMapper } from "./base-mappers/mapper";

const TO_SKILL_DTO: Readonly<Record<Skill, SkillDto>> = {
  [Skill.ForeignLanguage]: SkillDto.ForeignLanguage,
  [Skill.Planning]: SkillDto.Planning,
  [Skill.Presentation]: SkillDto.Presentation,
  [Skill.Communication]: SkillDto.Communication,
  [Skill.Logic]: SkillDto.Logic,
  [Skill.Design]: SkillDto.Design,
  [Skill.Programming]: SkillDto.Programming,
  [Skill.Teamwork]: SkillDto.Teamwork,
  [Skill.ProblemSolving]: SkillDto.ProblemSolving,
  [Skill.SystemAnalysis]: SkillDto.SystemAnalysis,
  [Skill.CounterArgument]: SkillDto.CounterArgument,
  [Skill.Marketing]: SkillDto.Marketing,
};

const FROM_SKILL_DTO = reverseRecord(TO_SKILL_DTO);

class SkillMapper implements IMapper<SkillDto, Skill> {
  public fromDto(data: SkillDto): Skill {
    return FROM_SKILL_DTO[data];
  }
  public toDto(data: Skill): SkillDto {
    return TO_SKILL_DTO[data];
  }
}

export const skillMapper = new SkillMapper();

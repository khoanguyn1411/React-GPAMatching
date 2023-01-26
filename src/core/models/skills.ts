export enum Skill {
  ForeignLanguage = "ForeignLanguage",
  Planning = "Planning",
  Presentation = "Presentation",
  Communication = "Communication",
  Logic = "Logic",
  Design = "Design",
  Programming = "Programming",
  Teamwork = "Teamwork",
  ProblemSolving = "ProblemSolving",
  SystemAnalysis = "SystemAnalysis",
  CounterArgument = "CounterArgument",
  Marketing = "Marketing",
}

const TO_READABLE_SKILL: Readonly<Record<Skill, string>> = {
  ForeignLanguage: "Ngoại ngữ",
  Planning: "Lên kế hoạch",
  Presentation: "Thuyết trình",
  Communication: "Giao tiếp",
  Logic: "Logic",
  Design: "Thiết kế",
  Programming: "Lập trình",
  Teamwork: "Teamwork",
  ProblemSolving: "Giải quyết vấn đề",
  SystemAnalysis: "Phân tích hệ thống",
  CounterArgument: "Phản biện",
  Marketing: "Marketing",
};

export namespace Skill {
  export function toReadable(skill: Skill) {
    return TO_READABLE_SKILL[skill];
  }
}

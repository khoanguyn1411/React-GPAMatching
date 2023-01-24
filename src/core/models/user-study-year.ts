export enum UserStudyYear {
  Year1 = "Year1",
  Year2 = "Year2",
  Year3 = "Year3",
  Year4 = "Year4",
}

const TO_STUDY_YEAR_READABLE: Readonly<Record<UserStudyYear, string>> = {
  [UserStudyYear.Year1]: "Năm 1",
  [UserStudyYear.Year2]: "Năm 2",
  [UserStudyYear.Year3]: "Năm 3",
  [UserStudyYear.Year4]: "Năm 4",
};

export namespace UserStudyYear {
  export function toReadable(studyYear: UserStudyYear) {
    return TO_STUDY_YEAR_READABLE[studyYear];
  }
}

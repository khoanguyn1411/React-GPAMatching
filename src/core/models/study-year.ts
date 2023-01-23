export enum StudyYear {
  Year1 = "Year1",
  Year2 = "Year2",
  Year3 = "Year3",
  Year4 = "Year4",
}

const TO_STUDY_YEAR_READABLE: Readonly<Record<StudyYear, string>> = {
  [StudyYear.Year1]: "Năm 1",
  [StudyYear.Year2]: "Năm 2",
  [StudyYear.Year3]: "Năm 3",
  [StudyYear.Year4]: "Năm 4",
};

export namespace StudyYear {
  export function toReadable(studyYear: StudyYear) {
    return TO_STUDY_YEAR_READABLE[studyYear];
  }
}

export enum Gender {
  Male = "male",
  Female = "female",
}

const TO_GENDER_READABLE: Readonly<Record<Gender, string>> = {
  [Gender.Female]: "Nữ",
  [Gender.Male]: "Nam",
};

export namespace Gender {
  export function toReadable(gender: Gender) {
    return TO_GENDER_READABLE[gender];
  }
}

import { reverseRecord } from "@/utils/funcs/reverse-record";

export enum KnownVia {
  FanPageGPA = "fanPageGPA",
  FanPageCompetition = "fanPageCompetition",
  FanPageSchool = "fanPageSchool",
  Friends = "friends",
  Groups = "groups",
  Other = "other",
}

const TO_KNOWN_VIA_READABLE_STRING: Readonly<Record<KnownVia, string>> = {
  [KnownVia.FanPageGPA]: "Fanpage Câu lạc bộ Tiềm năng Quản trị GPA",
  [KnownVia.FanPageCompetition]: "Fanpage Khởi nghiệp Kinh doanh",
  [KnownVia.FanPageSchool]: "Các fanpage của trường",
  [KnownVia.Friends]: "Bạn bè, người thân",
  [KnownVia.Groups]: "Các group sinh viên",
  [KnownVia.Other]: "Khác",
};

const FROM_READABLE_STRING = reverseRecord(TO_KNOWN_VIA_READABLE_STRING);

export namespace KnownVia {
  export function toReadable(knownVia: KnownVia) {
    return TO_KNOWN_VIA_READABLE_STRING[knownVia];
  }

  export function fromReadable(knownVia: string) {
    return FROM_READABLE_STRING[knownVia];
  }
}

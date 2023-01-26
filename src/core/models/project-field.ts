export enum ProjectField {
  ScienceAndTechnology = "ScienceAndTechnology",
  IndustryAndProduct = "IndustryAndProduct",
  AgroforestryAndFishery = "AgroforestryAndFishery",
  EducationAndMedican = "EducationAndMedican",
  ServiceAndTourism = "ServiceAndTourism",
  FinanceAndBanking = "FinanceAndBanking",
  Other = "Other",
}

const TO_READABLE_PROJECT_FIELD: Readonly<Record<ProjectField, string>> = {
  [ProjectField.ScienceAndTechnology]: "Khoa học - Công nghệ",
  [ProjectField.IndustryAndProduct]: "Công nghiệp - Chế tạo sản phẩm",
  [ProjectField.AgroforestryAndFishery]: "Nông lâm - Ngư nghiệp",
  [ProjectField.EducationAndMedican]: "Giáo dục - Y tế",
  [ProjectField.ServiceAndTourism]: "Dịch vụ - Du lịch",
  [ProjectField.FinanceAndBanking]: "Tài chính - Ngân hàng",
  [ProjectField.Other]: "Khác",
};
export namespace ProjectField {
  export function toReadable(field: ProjectField) {
    return TO_READABLE_PROJECT_FIELD[field];
  }
}

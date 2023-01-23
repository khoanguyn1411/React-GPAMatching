export enum ProjectStatus {
  NotFinished = "NotFinished",
  FinishedButNoProduct = "FinishedButNoProduct",
  FinishedWithProduct = "FinishedWithProduct",
  Other = "Other",
}

const TO_READABLE_PROJECT_STATUS: Readonly<Record<ProjectStatus, string>> = {
  [ProjectStatus.NotFinished]: "Đề án chưa hoàn thiện",
  [ProjectStatus.FinishedButNoProduct]: "Đề án đã hoàn thiện nhưng chưa có sản phẩm mẫu",
  [ProjectStatus.FinishedWithProduct]: "Đề án đã hoàn thiện và đã đưa sản phẩm mẫu ra thị trường",
  [ProjectStatus.Other]: "Khác",
};

export namespace ProjectStatus {
  export function toReadable(status: ProjectStatus) {
    return TO_READABLE_PROJECT_STATUS[status];
  }
}

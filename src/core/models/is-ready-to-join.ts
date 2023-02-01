import { reverseRecord } from "@/utils/funcs/reverse-record";

export namespace IsReadyToJoin {
  export function toReadable(isReadyToJoin: string | boolean) {
    return Boolean(isReadyToJoin) === true ? "Tham gia" : "Không tham gia";
  }
  export enum ThreeChoices {
    Yes = "Yes",
    Consider = "Consider",
    No = "No",
  }
  export namespace ThreeChoices {
    const TO_READABLE_READY_TO_JOIN: Readonly<Record<IsReadyToJoin.ThreeChoices, string>> = {
      [ThreeChoices.Yes]: "Có, chắc chắn sẽ tham gia",
      [ThreeChoices.Consider]: "Cân nhắc, cần thêm thông tin để quyết định",
      [ThreeChoices.No]: "Không tham gia",
    };
    const FROM_READABLE_READY_TO_JOIN = reverseRecord(TO_READABLE_READY_TO_JOIN);
    export function toReadable(isReadyToJoin: ThreeChoices) {
      return TO_READABLE_READY_TO_JOIN[isReadyToJoin];
    }

    export function fromReadable(isReadyToJoin: string) {
      return FROM_READABLE_READY_TO_JOIN[isReadyToJoin];
    }
  }
}

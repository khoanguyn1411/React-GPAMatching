export namespace IsReadyToJoin {
  export function toReadable(isReadyToJoin: string | boolean) {
    return Boolean(isReadyToJoin) === true ? "Tham gia" : "Không tham gia";
  }
}

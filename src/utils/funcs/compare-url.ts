export namespace CompareURL {
  export function isMatched(immutableUrl: string, changedUrl: string): boolean {
    return immutableUrl === changedUrl || immutableUrl === changedUrl.slice(0, -1);
  }

  export function isInclude(path: string | undefined, changedPath: string): boolean {
    return path ? changedPath.split("/").includes(path) : false;
  }
}

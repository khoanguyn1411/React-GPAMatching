export function compareUrl(immutableUrl: string, changedUrl: string): boolean {
  return immutableUrl === changedUrl || immutableUrl === changedUrl.slice(0, -1);
}

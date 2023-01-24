type UnionToRecord<Type extends any[]> = {
  [key in Type[number]]: string;
};

export function initializeEmptyValue<T extends any[]>(keyArr: T): UnionToRecord<T> {
  const obj = {};
  (keyArr as any[]).forEach((key) => Object.assign(obj, { [key]: "" }));
  return obj as UnionToRecord<T>;
}

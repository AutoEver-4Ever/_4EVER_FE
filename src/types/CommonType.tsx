// key와 value 값을 가지는 모든 형태
export interface KeyValueItem<T extends string = string> {
  key: T;
  value: string;
}

export interface Errors<T> {
  message: string
  path?: [keyof T]
}

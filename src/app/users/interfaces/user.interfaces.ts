export interface User {
  fullName: string
  birthDate: string
  email: string
  mainAddress: string
  secondaryAddresses?: string[]
}

export type ColumnKeys<T> = Array<keyof T>;

export interface UserColumns extends User {
  id: number;
  action: string;
}
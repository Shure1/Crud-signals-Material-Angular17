import { ColumnKeys, UserColumns } from "../../users/interfaces/user.interfaces";

export const DISPLAYES_COLUMNS_USER: ColumnKeys<UserColumns> = [
  'fullName',
  'birthDate',
  'email',
  'mainAddress',
  'action'
];
export const SORTABLES_USER: ColumnKeys<UserColumns> = [
  'id',
  'fullName',
  'birthDate',
  'email',
  'mainAddress'
];
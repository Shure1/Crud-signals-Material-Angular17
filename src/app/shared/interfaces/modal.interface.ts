export interface ErrorMessages {
  title?: string;
  message?: string;
  subtitle?: string;
  code?: number;
}

export interface ModalData extends ErrorMessages {
  firstBtnText: string;
  primaryCallback: Function;
  secondBtnText?: string;
  secondaryCallback?: Function;
  closeCallback?: Function;
  closeBtn?: boolean;
  personalData?: string;
  name?: string
}
export interface SecondaryAddress {
  address: string;
  isMain: boolean;
}

export interface UserForm {
  fullName: string;
  birthDate: Date | null;
  email: string;
  mainAddress: string;
  secondaryAddresses: SecondaryAddress[];
}

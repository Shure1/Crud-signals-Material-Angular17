import { SecondaryAddress, UserForm } from "../../shared/interfaces/modal.interface";
import { Util } from "../../shared/utils/utils";
import { User } from "../interfaces/user.interfaces";

export class UserMapper {
  constructor() {}

  static mapToUser(user: UserForm): User {
    const editMainAdress = user.secondaryAddresses.some((addr) => addr.isMain)
    if (!editMainAdress) return {
      fullName: user.fullName,
      birthDate: Util.formatDateToYMD(user.birthDate ?? ''),
      email: user.email,
      mainAddress: user.mainAddress,
      secondaryAddresses: user.secondaryAddresses?.map(addr => addr.address)
    };

    const mainAddres = user.secondaryAddresses.find((addr) => addr.isMain)
    const secondaryAddresfilter = user.secondaryAddresses.filter((addr) => addr.address !== mainAddres?.address)
    const newSecondaryAddres = [...secondaryAddresfilter?.map(addr => addr.address), user.mainAddress]
    return {
      fullName: user.fullName,
      birthDate: user.birthDate?.toISOString() || '',
      email: user.email,
      mainAddress: mainAddres?.address || '',
      secondaryAddresses: newSecondaryAddres
    };
  }
}
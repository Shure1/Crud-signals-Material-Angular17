import { computed, Injectable, signal } from '@angular/core';
import { USERS_MOCK } from '../../shared/mocks/usuarios_mock';
import { delay, Observable, of } from 'rxjs';
import { User } from '../interfaces/user.interfaces';
import { UserMapper } from '../mappers/user.mapper';
import { SecondaryAddress } from '../../shared/interfaces/modal.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersSignal = signal<User[]>(USERS_MOCK);
  userReadOnly = computed(() => this.usersSignal())

  constructor() {
    this.getUsers()
  }

  public getUsers(): void {
    of(USERS_MOCK).subscribe((users) => {
      this.usersSignal.update((currentUsers) => [
        ...currentUsers,
        ...users
      ])
    })
  }

  public getUserbyId(): Observable<User> {
    return of(USERS_MOCK[0])
  }

  public createUser(user: User): void {
    this.usersSignal.update(currentUsers => {
      return [{ ...user }, ...currentUsers]
    })
  }

  public updateUser(user: User & { secondaryAddresses: SecondaryAddress[]; birthDate: Date }): void {
    const userMap = UserMapper.mapToUser(user)
    this.usersSignal.update(currentUsers => {
      const filtered = currentUsers.filter(user => user.email !== userMap.email);
      return [{ ...userMap }, ...filtered];
    });
  }

  public deleteUser(email: string) {
    this.usersSignal.update(currentUsers => {
      const newUsers = currentUsers.filter(user => user.email !== email)
      return [...newUsers]
    })
  }



}

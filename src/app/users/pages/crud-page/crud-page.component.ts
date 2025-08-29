import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import { UserService } from '../../services/user.service';
import { ColumnKeys, User, UserColumns } from '../../interfaces/user.interfaces';
import { DISPLAYES_COLUMNS_USER, SORTABLES_USER } from '../../../shared/constants/user.constants';
import { Subscription } from 'rxjs';
import { ModalProvider } from '../../../shared/providers/modal.provider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-crud-page',
  standalone: true,
  imports: [
    MatButtonModule,
    TableComponent
  ],
  templateUrl: './crud-page.component.html',
  styleUrl: './crud-page.component.css'
})
export class CrudPageComponent {
  public userSignal = this.userSerice.userReadOnly;
  public subscriptionUsers?: Subscription

  public displayedColumns: ColumnKeys<UserColumns> = DISPLAYES_COLUMNS_USER;
  public sortables: ColumnKeys<UserColumns> = SORTABLES_USER;


  constructor(
    private readonly userSerice: UserService,
    private readonly modalProvider: ModalProvider
  ) {
  }

  public openModalUpdate(user: User) {
    this.modalProvider.openDialog(user).subscribe((user) => {
      this.userSerice.updateUser(user)
    })
  }

  public openModalCreate(): void {
    this.modalProvider.openDialog().subscribe((user) => {
      this.userSerice.createUser(user)
    })
  }

  public deleteUser(email: string): void {
    this.userSerice.deleteUser(email)
  }
}

import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MODAL_CONFIG } from "../constants/modal.constants";
import { ModalComponent } from "../components/modal-generic/modal-generic.component";
import { ModalData } from "../interfaces/modal.interface";
import { User } from "../../users/interfaces/user.interfaces";


@Injectable()
export class ModalProvider {
  private modal?: MatDialogRef<ModalComponent, any>;

  constructor(public dialog: MatDialog) {
  }

  public closeModals(): void {
    this.dialog.closeAll();
    this.modal = undefined;
  }

  public openDialog(data?: User) {
    if (Boolean(this.modal)) { this.closeModals(); }
    this.modal = this.dialog.open(ModalComponent, { data, panelClass: 'custom-dialog-container' });
    return this.modal.afterClosed()
  }
}
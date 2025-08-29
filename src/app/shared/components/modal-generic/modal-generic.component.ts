import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../users/interfaces/user.interfaces';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { UserForm } from '../../interfaces/modal.interface';

@Component({
  selector: 'app-modal-generic',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    ReactiveFormsModule,
    MatIconModule,
    CommonModule,
  ],
  providers: [],
  templateUrl: './modal-generic.component.html',
  styleUrl: './modal-generic.component.css'
})
export class ModalComponent implements OnInit {
  public fullName: string;
  public birthDate: string;
  public subtitle?: string;
  public email: string;
  public mainAddress: string;
  private primaryCallback: Function;
  private secondaryCallback: Function;
  private closeCallback: Function;
  public secondaryAddresses: string[];
  public userForm: FormGroup;
  startDate = new Date(1990, 0, 1);

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
  ) {
    Object.assign(this, data);
  }

  get secondaryAddressesControl(): FormArray {
    return this.userForm.get('secondaryAddresses') as FormArray;
  }

  public ngOnInit(): void {
    this.createForm()
  }

  public createForm() {
    this.userForm = this.formBuilder.group({
      fullName: [this.fullName || ''],
      birthDate: [this.birthDate ? new Date(this.birthDate) : null],
      email: [this.email || ''],
      mainAddress: [this.mainAddress || ''],
      secondaryAddresses: this.formBuilder.array(
        (this.secondaryAddresses || []).map(addr => this.formBuilder.group({
          address: [addr],
          isMain: [false]
        }))
      )
    });
  }

  public addSecondaryAddress() {
    this.secondaryAddressesControl.push(this.formBuilder.group({
      address: [''],
      isMain: [false]
    }));
  }

  public setAsMain(index: number) {
    this.secondaryAddressesControl.controls.forEach((control, i) => {
      control.get('isMain')?.setValue(i === index);
    });
  }

  public sendData() {
    this.dialogRef.close(this.userForm.value)
  }

  public primaryAction(): void {
    this.dialogClose();
    this.dialogRef.afterClosed().subscribe(() => this.primaryCallback());
  }

  public secondaryAction(): void {
    this.dialogClose();
    this.dialogRef.afterClosed().subscribe(() => this.secondaryCallback());
  }

  public dialogClose(): void {
    this.dialogRef.close();
    if (this.closeCallback) this.closeCallback();
  }
}

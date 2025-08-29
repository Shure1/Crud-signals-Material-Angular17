import { AfterViewInit, Component, ElementRef, input, ViewChild, effect, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatTableModule, } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { User } from '../../interfaces/user.interfaces';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatPaginatorModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public data = input.required<User[]>()
  public displayedColumns = input<string[]>([])
  public sortableColumns = input<string[]>([])
  @Output() public applicationUpdate: EventEmitter<User> = new EventEmitter();
  @Output() public applicationDelete: EventEmitter<string> = new EventEmitter();

  public dataSource = new MatTableDataSource<User>();

  constructor() {
    effect(() => {
      this.dataSource.data = this.data();
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public updateUser(user: User) {
    this.applicationUpdate.emit(user)
  }

  public deleteUser(email: string) {
    this.applicationDelete.emit(email)
  }

}

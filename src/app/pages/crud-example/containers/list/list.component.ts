import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CrudExampleService } from 'src/app/shared/crud-example/crud-example.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { IUser } from 'src/app/shared/model/user';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  private _subscriptions: Subscription[] = [];

  displayedColumns: string[] = ['id', 'name', 'age', 'operation'];
  dataSource: IUser[] = [];

  constructor(
    private _crudExampleService: CrudExampleService,
    private _dialog: MatDialog,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._getAll();
  }

  private _getAll(): void {
    const sub = this._crudExampleService.getAll().subscribe((item) => {
      this.dataSource = item;
    });
    this._subscriptions.push(sub);
  }

  delete(id: number): void {
    this._dialog
      .open(DialogComponent, {
        data: 'Eliminar',
      })
      .afterClosed()
      .subscribe((value) => {
        if (value) {
          const sub = this._crudExampleService.delete(id).subscribe((item) => {
            this._crudExampleService.openSnackBar(
              'Registro se elimino con exito'
            );
            this._getAll();
          });
        }
      });
  }

  goForm(id?: number): void {
    const path = !!id ? `forms/${id}` : 'forms';
    this._router.navigate([path]);
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((sub) => sub && sub.unsubscribe());
  }
}

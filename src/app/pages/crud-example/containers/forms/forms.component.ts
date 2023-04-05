import { Component, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CrudExampleService } from 'src/app/shared/crud-example/crud-example.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { IUser } from 'src/app/shared/model/user';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnDestroy {
  private _subscriptions: Subscription[] = [];

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, Validators.required),
    age: new FormControl(null, Validators.required),
  });

  constructor(
    private _crudExampleService: CrudExampleService,
    private _dialog: MatDialog,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    console.log(this._route);
    const {
      snapshot: {
        params: { id },
      },
    } = this._route;

    if (!!id) {
      this._getById(id);
    }
  }

  get nameField(): AbstractControl | null {
    return this.form.get('name');
  }

  get ageField(): AbstractControl | null {
    return this.form.get('age');
  }

  private _getById(id: number): void {
    const sub = this._crudExampleService.getById(id).subscribe((item) => {
      this.form.patchValue(item);
    });
    this._subscriptions.push(sub);
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const value = this.form.value;
    if (!!value?.id) {
      this._openDialog(false, false, value);
      return;
    }
    this._openDialog(true, false, value);
  }

  private _create(body: IUser): void {
    const sub = this._crudExampleService.create(body).subscribe((item) => {
      this._crudExampleService.openSnackBar('Registro creado con exito');
      this._goList();
    });
    this._subscriptions.push(sub);
  }

  private _update(body: IUser): void {
    const sub = this._crudExampleService.update(body).subscribe((item) => {
      this._crudExampleService.openSnackBar('Registro se actualizo con exito');
      this._goList();
    });
    this._subscriptions.push(sub);
  }

  private _openDialog(
    create: boolean,
    back: boolean,
    body: IUser = {} as IUser
  ): void {
    const sub = this._dialog
      .open(DialogComponent, {
        data: back ? 'Volver' : create ? 'Crear' : 'Editar',
      })
      .afterClosed()
      .subscribe((value) => {
        if (!value) return;
        if (back) {
          this._goList();
          return;
        }
        if (create) {
          this._create(body);
          return;
        }
        this._update(body);
      });
    this._subscriptions.push(sub);
  }

  back() {
    this._openDialog(false, true);
  }

  private _goList() {
    this._router.navigate(['../']);
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((sub) => sub && sub.unsubscribe());
  }
}

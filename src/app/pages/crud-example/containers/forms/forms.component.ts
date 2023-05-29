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
import { Patient } from 'src/app/shared/model/Patient';
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';



@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],

})
export class FormsComponent implements OnDestroy {
  files: File[] = [];
  idCar: string = 'SFF567';

  private _subscriptions: Subscription[] = [];

  form: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    lastName:new FormControl(null, Validators.required),
    sex:new FormControl(null, Validators.required),
    addres:new FormControl(null, Validators.required),
    mail:new FormControl(null, Validators.required),
    cell:new FormControl(null, Validators.required),
    age:new FormControl(null, Validators.required),
    scheduleAppointment: new FormControl(null, Validators.required)
  });

  constructor(
    private _http: HttpClient,
    private _crudExampleService: CrudExampleService,
    private _dialog: MatDialog,
    private _router: Router,
    private _route: ActivatedRoute

  ) {
    const {
      snapshot: {
        params: { id },
      },
    } = this._route;

    if (!!id) {
    }
  }

  get nameField(): AbstractControl | null {
    return this.form.get('name');
  }

  get ageField(): AbstractControl | null {
    return this.form.get('age');
  }


  onSubmit(): void {
    console.log("submit")
    console.log(this.form.invalid)
    if (this.form.invalid) return;
    const value = this.form.value;
    if (!!value?.id) {
      this._openDialog(false, false, value);
      return;
    }
    this._openDialog(true, false, value);
  }

  private _create(body: Patient): void {
    const sub = this._crudExampleService.create(body).subscribe((item) => {
      this._crudExampleService.openSnackBar('Registro creado con exito');
    });
    this._subscriptions.push(sub);
  }


  private _openDialog(
    create: boolean,
    back: boolean,
    body: Patient = {} as Patient
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
  upload(): void {
    console.log('ok')
    const url = 'http://localhost:8080/loard_documents';
  
    const formData: FormData = new FormData();
    formData.append('idCar', this.idCar);
  
    for (let file of this.files) {
      formData.append('files', file);
    }
  
    this._http.post(url, formData)
      .subscribe(
        response => {
          console.log('Upload successful:', response);
          // Process the response as needed
        },
        error => {
          console.error('Error uploading documents:', error);
          // Handle the error
        }
      );

  
  }

  onFileSelected(event: any): void {
    this.files = event.target.files;
    console.log(this.files.length); // Aquí puedes ver los archivos seleccionados
  }
      
  


}
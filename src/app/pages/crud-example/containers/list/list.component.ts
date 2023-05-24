import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CrudExampleService } from 'src/app/shared/crud-example/crud-example.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { Patient } from 'src/app/shared/model/Patient';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  private _subscriptions: Subscription[] = [];
  public criterial: string = '';

  displayedColumns: string[] = ['idAppointment', 'name', 'lastName', 'sex', 'address', 'mail', 'cell', 'age', 'scheduleAppointment', 'approved'];
  dataSource: Patient[] = [];
  users: Patient[] = [];


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
      this.users = item;
    });
    this._subscriptions.push(sub);
    console.log(sub)
  }


  goForm(id?: number): void {
    const path = !!id ? `forms/${id}` : 'forms';
    console.log(path+"xd")
    this._router.navigate([path]);
  }
  test(): void{
    //const path = `forms/${this.criterial}`
    
    this.dataSource=this.users.filter(user => user.name === this.criterial)


  }
  listUsers(): void{
    this.dataSource  = this.users;
    this.criterial = '';



  }
  approvePatient(patientId: string): void {
    const patient = this.dataSource.find(p => p.idAppointment === patientId);
    if (patient) {
      this._crudExampleService.approvedAppointment(patientId,patient).subscribe(
        () => {
          // La solicitud fue exitosa, realiza cualquier acción adicional necesaria
          // ...
  
          // Actualiza el estado de aprobación del paciente
          patient.approved = true;
        },
        error => {
          // Ocurrió un error al realizar la solicitud HTTP, maneja el error apropiadamente
          console.error('Error al realizar la solicitud HTTP:', error);
        }
      );
          console.log(patientId);


          patient.approved = true;
        }
  }



  ngOnDestroy(): void {
    this._subscriptions.forEach((sub) => sub && sub.unsubscribe());
  }
}

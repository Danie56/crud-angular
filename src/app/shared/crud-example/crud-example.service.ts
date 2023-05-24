import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Patient } from '../model/Patient';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CrudExampleService {
  private _url = environment.url + environment.patch.user;

  constructor(private _http: HttpClient, private _snackBar: MatSnackBar) {}

  getAll(): Observable<Patient[]> {
    return this._http.get<Patient[]>(this._url+environment.Endpoints.getAll);
  }

  

  create(body: Patient): Observable<Patient> {
    return this._http.post<Patient>(this._url+environment.Endpoints.save, body);
  }



  approvedAppointment(idAppointment: string,patient:Patient): Observable<Patient> {
    return this._http.put<Patient>(this._url+ environment.Endpoints.delete + idAppointment,patient);
  }

  openSnackBar(message: string): void {
    this._snackBar.open(message, 'Close');
  }
}

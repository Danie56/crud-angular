import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { IUser } from '../model/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CrudExampleService {
  private _url = environment.url + environment.patch.user;

  constructor(private _http: HttpClient, private _snackBar: MatSnackBar) {}

  getAll(): Observable<IUser[]> {
    return this._http.get<IUser[]>(this._url).pipe(
      map((item: any) => {
        return item.map((element: any) => {
          return { ...element, id: element?._id };
        });
      })
    );
  }

  getById(id: number): Observable<IUser> {
    return this._http.get<IUser>(this._url + id).pipe(
      map((item: any) => {
        return { ...item, id: item?._id };
      })
    );
  }

  create(body: IUser): Observable<IUser> {
    return this._http.post<IUser>(this._url, body);
  }

  update(body: IUser): Observable<IUser> {
    return this._http.put<IUser>(this._url + body?.id, body);
  }

  delete(id: number): Observable<IUser> {
    return this._http.delete<IUser>(this._url + id);
  }

  openSnackBar(message: string): void {
    this._snackBar.open(message, 'Close');
  }
}

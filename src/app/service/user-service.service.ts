import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IUser} from '../iuser';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  urlAPI = 'http://localhost:8080/users';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.http.get(this.urlAPI);
  }

  create(user: IUser): Observable<any> {
    return this.http.post<IUser>(this.urlAPI, user);
  }
}

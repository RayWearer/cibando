import { Injectable } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiBaseUrl = 'api/users';
  datiUtente = new Subject();
//datiUtente = new ReplaySubject();

  constructor(private http: HttpClient) { }

  saveUser(user: any) {
    return this.http.post<any>(`${this.apiBaseUrl}/signup`, user);
  }

}

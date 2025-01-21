import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

interface User{
  _id: string,
  name: string,
  email: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiBaseUrl = "api/users";

  constructor(private http: HttpClient, private userService: UserService) {

  }

  login(email: string, password: string) {
    const USER = {email: email, password: password};
    return this.http.post(`${this.apiBaseUrl}/login`, USER);
  }

  saveStorage(res) {
    const USER: User = {
      _id: res._id,
      name: res.name,
      email: res.email,
      password: res.password
    }

    localStorage.setItem('user', JSON.stringify(USER));
  }

  isLogged(): boolean {
    return JSON.parse(localStorage.getItem('user')) !== null;
  }

  logOut() {
    localStorage.removeItem('user');
  }

}

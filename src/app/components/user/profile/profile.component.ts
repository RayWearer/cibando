import { Component, inject } from '@angular/core';
import { UserService } from '../../../services/user.service';

interface User{
  _id: string,
  name: string,
  email: string,
  password: string,
  role: string,
  createdAt: Date,
  updatedAt: Date
}
@Component({
  selector: 'app-profile',
  standalone: false,

  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  private userService = inject(UserService);
  user: any;
  email;

  constructor() {
    if(JSON.parse(localStorage.getItem('user')) !== null) {
      this.email = JSON.parse(localStorage.getItem('user')).email;
    }
    if(this.email){
      this.getUser();
    }
  }

  getUser() {
    this.userService.getUserDetail(this.email).subscribe({
      next: (response) => {
        this.user = response
      },
      error: (e) => console.log(e)
    })
  }

}

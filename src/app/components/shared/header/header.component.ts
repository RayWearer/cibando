import { Component, DoCheck } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { RecipesService } from '../../../services/recipes.service';

interface User {
  _id: string,
  name: string,
  email: string,
  password: string,
  createdAt: Date,
  updatedAt: Date
}
@Component({
  selector: 'app-header',
  standalone: false,

  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements DoCheck {

  isCollapsed = true;
  user: User;

  ricette = [];

  constructor(private router: Router, private recipeService: RecipesService, public authService: AuthService) {

  }

  ngDoCheck(): void {
    if(JSON.parse(localStorage.getItem('user')) !== null) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
  }

  logOut() {
    this.authService.logOut();
    this.router.navigateByUrl('home');
  }

  /*
  onSearchRequest(searchInput: string) {
    this.recipeService.fillSearchKey(searchInput);
    this.router.navigate(['/ricette']);
  }
  */
}

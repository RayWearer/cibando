import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  evidenziato = false;

  onEvidenzazione() {
    this.evidenziato = !this.evidenziato;
  }
}
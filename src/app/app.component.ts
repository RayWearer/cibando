import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'cibando';

  percorso = "../assets/images/carousel-";

  images = [
    {id: 1, label: 'Spaghetti al pomodoro'},
    {id: 2, label: 'Tagliata di manzo'},
    {id: 3, label: 'Tiramisù classico'}
  ];
}

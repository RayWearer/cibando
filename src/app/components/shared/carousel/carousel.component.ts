import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: false,

  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {
  percorso = "../../../../assets/images/carousel-";

  images = [
    {id: 1, label: 'Spaghetti al pomodoro'},
    {id: 2, label: 'Tagliata di manzo'},
    {id: 3, label: 'Tiramisù classico'}
  ];
}


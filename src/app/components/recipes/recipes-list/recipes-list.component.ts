import { Component, inject } from '@angular/core';
import { Recipe } from '../../../models/recipes.model';
import { RecipesService } from '../../../services/recipes.service';
import { Observable, take, filter, map, first } from 'rxjs';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-recipes-list',
  standalone: false,

  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.scss'
})
export class RecipesListComponent {
  ricette: Recipe[] = [];
  titoloRicevuto: any;
  first: number = 0;
  rows: number = 10;
  page: number = 1;
  size: number = 4;

  recipeService = inject(RecipesService);
  //Creiamo una nuova variabile per le ricette, la chiamiamo in inglese per non confonderla con la prima. Questa
  // verrà identificata PER CONVENZIONE con il simbolo $ alla fine, che sta ad indicare un dato che verrà definito da chiamata async
  recipes$: Observable<Recipe[]> = this.recipeService.getRecipes().pipe(
    map(response => response.filter(ricetteFiltrate => ricetteFiltrate.difficulty < 3)),
    map(res => this.totaleRicette = res)
  );
  totaleRicette: Recipe[];

  constructor() { //constructor(private recipeService: RecipesService)
    /*
    this.recipeService.getRecipes().pipe(
      first(), // take(1)
      // map(response => response.content),
      // filter()
    ).subscribe({
      next: (response) => {
        this.ricette = response;
      },
      error: (e) => console.log(e)
    })
    */
//  this.getRecipes();
  }

  riceviTitolo(event: any) {
    this.titoloRicevuto = event;
  }

  onPageChange(event) {
    event.page = event.page + 1;
    this.page = event.page;
    this.size = event.rows;
  }

  getRecipes() {
    this.recipeService.getRecipes().pipe(
      first(),
    ).subscribe({
      next: (response) => {
        this.ricette = response;
      },
      error: (e) => console.log(e)
    })
  }
}

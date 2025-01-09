import { Component } from '@angular/core';
import { RecipesService } from '../../services/recipes.service';
import { Recipe } from '../../models/recipes.model';

@Component({
  selector: 'app-recipes',
  standalone: false,

  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss'
})
export class RecipesComponent {
  ricette: Recipe[] = [];

  constructor(private recipeService: RecipesService) {
    this.recipeService.getRecipes().subscribe({
      next: (response) => {
        this.ricette = response;
      },
      error: (e) => console.error(e)
    })
  }

}

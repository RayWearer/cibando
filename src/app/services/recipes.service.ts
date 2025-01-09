import { Injectable } from '@angular/core';
import { RECIPES } from '../mocks/recipes.mock';
import { Observable, of } from 'rxjs'; //of viene utilizzato con i dati mockati per simularli come reali
import { Recipe } from '../models/recipes.model';

@Injectable({
  providedIn: 'root'
})

export class RecipesService {

  constructor() { }

  getRecipes(): Observable<Recipe[]>{
    return of (RECIPES);
  }

}

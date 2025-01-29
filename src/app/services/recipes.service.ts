import { Injectable } from '@angular/core';
import { RECIPES } from '../mocks/recipes.mock';
import { Observable, of } from 'rxjs'; //of viene utilizzato con i dati mockati per simularli come reali
import { Recipe } from '../models/recipes.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class RecipesService {

  apiBaseUrl = 'api/recipes';

  constructor(private http: HttpClient) { }

  createRecipe(recipe: Recipe): Observable<Recipe>{
    return this.http.post<Recipe>(`${this.apiBaseUrl}/`, recipe);
  }

  getDetail(id: string): Observable<Recipe | undefined>{
    //  const RECIPE = RECIPES.find(ricetta => ricetta._id === id); Parte Mockata
    //  return of (RECIPE);
    return this.http.get<Recipe>(`${this.apiBaseUrl}/${id}`);
  }

  getRecipes() { //: Observable<Recipe[]>
    //  return of (RECIPES); Parte Mockata
    return this.http.get<Recipe[]>(`${this.apiBaseUrl}/`);
  }

  updateRecipe(recipe: Recipe): Observable<Recipe>{
    return this.http.put<Recipe>(`${this.apiBaseUrl}/${recipe._id}`, recipe);
  }

  deleteRecipe(id: string): Observable<Recipe>{
    return this.http.delete<Recipe>(`${this.apiBaseUrl}/${id}`);
  }

}

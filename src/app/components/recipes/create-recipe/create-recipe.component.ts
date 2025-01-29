import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Recipe } from '../../../models/recipes.model';
import { RecipesService } from '../../../services/recipes.service';

@Component({
  selector: 'app-create-recipe',
  standalone: false,

  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.scss'
})
export class CreateRecipeComponent {

  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    difficulty: new FormControl('', [Validators.required])
  })

  private recipesService = inject(RecipesService);

  ricetta: Recipe | undefined;
  //difficultyLevels = [1, 2, 3, 4, 5];

  onSubmit() {
    this.onPostDetails();
  }

  onPostDetails() {
    const ricetta: Recipe = {
      _id: '',
      title: this.form.controls.title.value,
      description: this.form.controls.description.value,
      image: this.form.controls.image.value,
      difficulty: Number(this.form.controls.difficulty.value),
      published: true,
      updatedAt: new Date().toISOString()
    }

    this.recipesService.createRecipe(ricetta).subscribe({
      next: response => {
        this.ricetta = response;
      },
      error: e => console.log(e)
    })
  }

  /* Metodo per caricare l'immagine da locale
  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.form.patchValue({ image: reader.result as string });
      };
      reader.readAsDataURL(file); // Convertiamo il file in Base64
    }
  }
  */

}

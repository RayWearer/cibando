import { Component, inject, ViewChild, ElementRef } from '@angular/core';
import { Recipe } from '../../../models/recipes.model';
import { RecipesService } from '../../../services/recipes.service';
import { Observable, take, filter, map, first } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';

/*
interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}
*/
@Component({
  selector: 'app-recipes-list',
  standalone: false,

  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.scss'
})
export class RecipesListComponent {
  @ViewChild('modaleElimina', {static: false}) modaleElimina: ElementRef;
  @ViewChild('modaleAggiorna', {static: false}) modaleAggiorna: ElementRef;

  form = new FormGroup({
      id: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      difficulty: new FormControl('', [Validators.required])
  })

  ricette: Recipe[] = [];
  ricetta: Recipe | undefined;

  //  titoloRicevuto: any;

  first: number = 0;
  rows: number = 10;
  page: number = 1;
  size: number = 4;

  modalId: string = '';
  modalTitle: string = '';
  modalDescription: string = '';
  modalImage: string = '';
  modalDifficulty: number;

  role: string;

  authService = inject(AuthService);

  recipeService = inject(RecipesService);
  //  Creiamo una nuova variabile per le ricette, la chiamiamo in inglese per non confonderla con la prima. Questa
  //  verrà identificata PER CONVENZIONE con il simbolo $ alla fine, che sta ad indicare un dato che verrà definito da chiamata async
  recipes$: Observable<Recipe[]> = this.recipeService.getRecipes().pipe(
    //  map(response => response.filter(ricetteFiltrate => ricetteFiltrate.difficulty < 3)),
    map(res => this.totaleRicette = res)
  );
  totaleRicette: Recipe[];

  constructor(private modalService: NgbModal) { //constructor(private recipeService: RecipesService)
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
    if(JSON.parse(localStorage.getItem('user')) !== null) {
      this.role = JSON.parse(localStorage.getItem('user')).role;
      console.log(this.role);
    }
  }

  /*
  riceviTitolo(event: any) {
    this.titoloRicevuto = event;
  }
  */

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

  openModal(content: any, id?: string, title?: string){
    this.modalId = id;
    this.modalTitle = title;
    this.modalService.open(content, {centered: true, size: 'lg'}).result
      .then((result) => {
        this.recipeService.getDetail(id);
      })
  }

  onUpdateRequest(recipe) {
    this.form.patchValue({
      id: recipe._id,
      title: recipe.title,
      description: recipe.description,
      image: recipe.image,
      difficulty: recipe.difficulty
    });
    this.openModal(this.modaleAggiorna);
  }

  confirmUpdate() {
    if (this.form.valid) {
      const updatedRecipe: Recipe = {
        _id: this.form.value.id,
        title: this.form.value.title,
        description: this.form.value.description,
        image: this.form.value.image,
        difficulty: Number(this.form.value.difficulty),
        updatedAt: new Date().toISOString()
      };

      this.recipeService.updateRecipe(updatedRecipe).subscribe({
        next: (response) => {
          console.log('Ricetta aggiornata con successo!', response);
          this.modalService.dismissAll();
        },
        error: (err) => {
          console.error('Errore durante l\'aggiornamento:', err);
        }
      });
    } else {
      console.error('Form non valido!');
    }
  }

  onDeleteRequest(recipe) {
    this.openModal(this.modaleElimina, recipe._id, recipe.title);
  }

  confirmDeletion(id: string) {
    this.recipeService.deleteRecipe(id).subscribe({
      next: (response) => {
        console.log('Ricetta eliminata con successo!', response);
        this.getRecipes();
      },
      error: (err) => {
        console.error('Errore durante l\'eliminazione della ricetta:', err);
      },
    });
  }

}

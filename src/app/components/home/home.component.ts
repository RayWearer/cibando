import { Component, ViewChild, ElementRef, OnInit, AfterViewInit, signal } from '@angular/core';
import { Recipe } from '../../models/recipes.model';
import { RecipesService } from '../../services/recipes.service';
import { UserService } from './../../services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @ViewChild('modaleRegistrazione', {static: false}) modaleRegistrazione: ElementRef;

  isLoaded = signal(false);

  evidenziato = false;
  ricette: Recipe[] = [];
  datiRegistrazione = {};
  idModale: number = 0;
  nomeModale: string = '';

  constructor(
      private recipeService: RecipesService,
      private userService: UserService,
      private modalService: NgbModal
    ) {
    this.recipeService.getRecipes().subscribe({
      next: (response) => {
        this.ricette = response.sort((a, b) => Number(b._id) - Number(a._id)).slice(0, 4);
      },
      error: (e) => console.error(e)
    });

    this.userService.datiUtente.subscribe( response => {
      console.log(response);
      // debugger;  Breakpoint lato classe
      this.datiRegistrazione = response
      if(response != null){
        this.openModal(this.modaleRegistrazione);
      }
    });
  }

    /* Utilizzare localStorage per immagazzinare i dati dell'utente, accetta solo stringhe quindi usiamo stringify
  ngAfterViewInit(): void {
    this.userService.datiUtente.subscribe( response => {
      console.log(response);
      localStorage.setItem('datiRegistrazione', JSON.stringify(response));
    });
    // Utilizzare localStorage per recuperare i dati dell'utente
    if(localStorage.getItem('datiRegistrazione')){
      this.datiRegistrazione = JSON.parse(localStorage.getItem('datiRegistrazione'));
      // Ripuliamo localStorage dei dati dell'utente
      localStorage.removeItem('datiRegistrazione');
    }
  }
  */

  onEvidenzazione() {
    this.evidenziato = !this.evidenziato;
  }

  openModal(content: any, id?: number, nome?: string){
    this.idModale = id;
    this.nomeModale = nome;
    this.modalService.open(content, {centered: true, ariaLabelledBy: 'modale di benvenuto', size: 'lg'}).result
      .then((result) => {
        console.log('azione da eseguire' + result);
        this.userService.datiUtente.next(null);
      })
        .catch((error) => {
          console.log('nessuna azione da eseguire');
          this.userService.datiUtente.next(null);
        })
  }

  toggle() {
    this.isLoaded.update((val) => !val);
    //  this.isLoaded.set(!this.isLoaded());
  }

}

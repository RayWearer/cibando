import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { Recipe } from '../../../models/recipes.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-recipe-card',
  standalone: false,

  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss'
})
export class RecipeCardComponent {

  @Input() recipe: Recipe | undefined;
  @Input() page: string = '';
  @Input() adminView: boolean = false;
  @Output() deleteRequest = new EventEmitter();
  @Output() updateRequest = new EventEmitter();

  private sanitizer = inject(DomSanitizer);

  sendDelete(event) {
    this.deleteRequest.emit(event);
  }

  sendUpdate(event) {
    this.updateRequest.emit(event);
  }

  /*
  getSanitizeHtml(descrizione: string): SafeHtml {
    const tagliaDescrizione = this.accorciaDescrizione(descrizione);
    const sanificaDescrizione = this.sanitizer.bypassSecurityTrustHtml(tagliaDescrizione);
    return sanificaDescrizione;
  }
  */

  accorciaDescrizione(descrizione: string): string {
    const lunghezzaDescrizione = 200;
    if(descrizione.length <= lunghezzaDescrizione) {
      return descrizione;
    } else {
      return descrizione.slice(0, lunghezzaDescrizione) + '...';
    }
  }

}

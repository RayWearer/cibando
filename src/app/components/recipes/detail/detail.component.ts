import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../../../services/recipes.service';
import { Recipe } from '../../../models/recipes.model';

@Component({
  selector: 'app-detail',
  standalone: false,

  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})

export class DetailComponent implements OnInit {

  private recipesService = inject(RecipesService);
  private activatedRoute = inject(ActivatedRoute);
  private Router = inject(Router);

  ricetta: Recipe | undefined;

  percorsoStelline = "../../../../assets/images/difficolta-";

  ngOnInit(): void {
    this.onGetDetail();
  }

  onGetDetail() {
    const id = this.activatedRoute.snapshot.paramMap.get('_id');

    if(id) {
      this.recipesService.getDetail(id).subscribe({
        next: response => {
          this.ricetta = response;
        },
        error: e => console.log(e)
      })
    }

  }

  /* Seconda versione dello stesso metodo
  onGetDetail(): void {
    this.activatedRoute.params.subscribe((urlParams) => {
      const id = urlParams['_id'];
      const idNum = Number(id);
      // const title = urlParams['title'];

      if(idNum) {
        this.recipesService.getDetail(idNum).subscribe(result => this.ricetta = result);
      }
    })
  }
  */

}

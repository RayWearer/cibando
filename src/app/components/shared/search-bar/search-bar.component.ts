import { Component, Output, EventEmitter } from '@angular/core';
import { SearchService } from '../../../services/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: false,

  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  searchInput: string = '';

  constructor(private searchService: SearchService, private router: Router) { }

  searchRecipes() {
    this.searchService.setSearchKey(this.searchInput);
    this.router.navigate(['/ricette']);
  }

}

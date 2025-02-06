import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchKeySubject = new BehaviorSubject<string>('');

  constructor() { }

  setSearchKey(key: string): void {
    this.searchKeySubject.next(key);
  }

  getSearchKey(): Observable<string> {
    return this.searchKeySubject.asObservable();
  }

}

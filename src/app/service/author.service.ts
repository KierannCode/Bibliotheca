import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { AuthorDto } from '../dto/AuthorDto';
import { AuthorSearchDto } from '../dto/AuthorSearchDto';
import { Author } from '../model/Author';
import { EntityManager } from '../model/EntityManager';
import { AppConfig } from '../util/AppConfig';
import { ManagedObservable } from '../util/ManagedObservable';
import { Page } from '../util/Page';
import { Pageable } from '../util/Pageable';
import { ObservableService } from '../util/service/observable.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  pageSize: number = 10;

  constructor(private http: HttpClient, public config: AppConfig, private observableService: ObservableService) { }

  getAuthors(authorSearchDto: AuthorSearchDto, pageable: Pageable): ManagedObservable<Page<Author>> {
    if (pageable.size == undefined) {
      pageable.size = this.pageSize;
    }
    let url = `${this.config.API_ENDPOINT}/authors?page=${encodeURIComponent(pageable.page)}&size=${encodeURIComponent(pageable.size)}&sort=${encodeURIComponent(pageable.sort)},${encodeURIComponent(pageable.order)}`;
    for (let [key, value] of Object.entries(authorSearchDto)) {
      if (value != null) {
        url += `&${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      }
    }
    return this.observableService.manage(this.http.get<Page<any>>(url, { withCredentials: true }).pipe(tap(page => page.content = page.content.map(author => EntityManager.deserialize(author, Author)))));
  }

  createAuthor(authorDto: AuthorDto): ManagedObservable<Author> {
    return this.observableService.manage(this.http.post<Author>(`${this.config.API_ENDPOINT}/author`, authorDto, { withCredentials: true }).pipe(map(author => EntityManager.deserialize(author, Author))));
  }

  updateAuthor(authorId: number, authorDto: AuthorDto): ManagedObservable<Author> {
    return this.observableService.manage(this.http.patch<Author>(`${this.config.API_ENDPOINT}/author/${authorId}`, authorDto, { withCredentials: true }).pipe(map(author => EntityManager.deserialize(author, Author))));
  }

  deleteAuthor(authorId: number): ManagedObservable<Author> {
    return this.observableService.manage(this.http.delete<Author>(`${this.config.API_ENDPOINT}/author/${authorId}`, { withCredentials: true }).pipe(map(author => EntityManager.deserialize(author, Author))));
  }
}

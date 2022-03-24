import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { AuthorDto } from '../dto/AuthorDto';
import { AuthorSearchDto } from '../dto/AuthorSearchDto';
import { Author } from '../model/Author';
import { Data } from '../model/Data';
import { EntityManager } from '../model/EntityManager';
import { AppConfig } from './util/AppConfig';
import { Page } from './util/Page';
import { Pageable } from './util/Pageable';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  pageSize: number = 10;

  constructor(private http: HttpClient, public config: AppConfig) { }

  getAuthors(authorSearchDto: AuthorSearchDto, pageable: Pageable): Observable<Page<Author>> {
    if (pageable.size == undefined) {
      pageable.size = this.pageSize;
    }
    let url = `${this.config.API_ENDPOINT}/authors?page=${encodeURIComponent(pageable.page)}&size=${encodeURIComponent(pageable.size)}&sort=${encodeURIComponent(pageable.sort)},${encodeURIComponent(pageable.order)}`;
    for (let [key, value] of Object.entries(authorSearchDto)) {
      if (value != null) {
        url += `&${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      }
    }
    return this.http.get<Page<any>>(url, { withCredentials: true }).pipe(tap(page => page.content = page.content.map(author => EntityManager.deserialize(author, Author))));
  }

  createAuthor(authorDto: AuthorDto): Observable<Author> {
    return this.http.post<Author>(`${this.config.API_ENDPOINT}/author`, authorDto, { withCredentials: true }).pipe(map(author => EntityManager.deserialize(author, Author)));
  }

  updateAuthor(authorId: number, authorDto: AuthorDto): Observable<Author> {
    return this.http.patch<Author>(`${this.config.API_ENDPOINT}/author/${authorId}`, authorDto, { withCredentials: true }).pipe(map(author => EntityManager.deserialize(author, Author)));
  }

  deleteAuthor(authorId: number): Observable<void> {
    return this.http.delete<void>(`${this.config.API_ENDPOINT}/author/${authorId}`, { withCredentials: true });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthorDto } from '../dto/AuthorDto';
import { AuthorSearchDto } from '../dto/AuthorSearchDto';
import { Author } from '../model/Author';
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
    return this.http.get<Page<Author>>(url, { withCredentials: true });
  }

  createAuthor(authorDto: AuthorDto): Observable<Author> {
    return this.http.post<Author>(`${this.config.API_ENDPOINT}/author`, authorDto, {withCredentials: true});
  }

  updateAuthor(authorId: number, authorDto: AuthorDto): Observable<Author> {
    return this.http.patch<Author>(`${this.config.API_ENDPOINT}/author/${authorId}`, authorDto, {withCredentials: true});
  }

  deleteAuthor(authorId: number): Observable<void> {
    return this.http.delete<void>(`${this.config.API_ENDPOINT}/author/${authorId}`, {withCredentials: true});
  }
}

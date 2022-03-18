import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from '../model/Author';
import { AppConfig } from './util/AppConfig';
import { Page } from './util/Page';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  pageSize: number = 2;

  constructor(private http: HttpClient, public config: AppConfig) { }

  getAuthors(page: number, sort: string, order: string): Observable<Page<Author>> {
    return this.http.get<Page<Author>>(`${this.config.API_ENDPOINT}/authors?page=${encodeURIComponent(page)}&size=${encodeURIComponent(this.pageSize)}&sort=${encodeURIComponent(sort)},${encodeURIComponent(order)}`, { withCredentials: true });
  }
}

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

  pageSize: number = 20;

  constructor(private http: HttpClient) { }

  getAuthors(page: number, sort: string, order: string): Observable<Page<Author>> {
    return this.http.get<Page<Author>>(`${AppConfig.API_ENDPOINT}/authors?page=${encodeURIComponent(page)}&size=${encodeURIComponent(this.pageSize)}&sort=${encodeURIComponent(sort)},${encodeURIComponent(order)}`, { withCredentials: true });
  }
}

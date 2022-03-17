import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token } from '../model/Token';
import { AppConfig } from './util/AppConfig';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private http: HttpClient) { }

  generateToken(): Observable<Token> {
    return this.http.post<Token>(`${AppConfig.API_ENDPOINT}/token`, {}, {withCredentials: true});
  }
}

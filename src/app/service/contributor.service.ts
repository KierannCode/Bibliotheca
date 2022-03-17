import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LogInDto } from '../dto/LogInDto';
import { SignUpDto } from '../dto/SignUpDto';
import { Contributor } from '../model/Contributor';
import { AppConfig } from './util/AppConfig';

@Injectable({
  providedIn: 'root'
})
export class ContributorService {

  constructor(private http: HttpClient) { }

  getAuthenticatedContributer(): Observable<Contributor> {
    return this.http.get<Contributor>(`${AppConfig.API_ENDPOINT}/contributor`, {withCredentials: true});
  }

  signUp(dto: SignUpDto): Observable<Contributor> {
    return this.http.post<Contributor>(`${AppConfig.API_ENDPOINT}/register`, dto, {withCredentials: true});
  }

  logIn(dto: LogInDto): Observable<Contributor> {
    return this.http.post<Contributor>(`${AppConfig.API_ENDPOINT}/authenticate`, dto, {withCredentials: true});
  }

  logOut(): Observable<void> {
    return this.http.post<void>(`${AppConfig.API_ENDPOINT}/logOut`, {}, {withCredentials: true});
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';
import { LogInDto } from '../dto/LogInDto';
import { SignUpDto } from '../dto/SignUpDto';
import { User } from '../model/User';
import { AppConfig } from './util/AppConfig';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAuthenticatedUser(): Observable<User> {
    return this.http.get<User>(`${AppConfig.API_ENDPOINT}/user`, {withCredentials: true});
  }

  signUp(dto: SignUpDto): Observable<User> {
    return this.http.post<User>(`${AppConfig.API_ENDPOINT}/register`, dto, {withCredentials: true});
  }

  logIn(dto: LogInDto): Observable<User> {
    return this.http.post<User>(`${AppConfig.API_ENDPOINT}/authenticate`, dto, {withCredentials: true});
  }

  logOut(): Observable<void> {
    return this.http.post<void>(`${AppConfig.API_ENDPOINT}/logOut`, {}, {withCredentials: true});
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAuthentifiedUser(): Observable<User> {
    return this.http.get<User>(`${AppComponent.API_ENDPOINT}/contributor`, {withCredentials: true});
  }
}

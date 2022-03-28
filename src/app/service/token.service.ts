import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token } from '../model/Token';
import { AppConfig } from '../util/AppConfig';
import { ManagedObservable } from '../util/ManagedObservable';
import { ObservableService } from '../util/service/observable.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private http: HttpClient, private config: AppConfig, private observableService: ObservableService) { }

  generateToken(): ManagedObservable<Token> {
    return this.observableService.manage(this.http.post<Token>(`${this.config.API_ENDPOINT}/token`, {}, {withCredentials: true}));
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LogInDto } from '../dto/LogInDto';
import { SignUpDto } from '../dto/SignUpDto';
import { Contributor } from '../model/Contributor';
import { AppConfig } from '../util/AppConfig';
import { ManagedObservable } from '../util/ManagedObservable';
import { ObservableService } from '../util/service/observable.service';

@Injectable({
  providedIn: 'root'
})
export class ContributorService {
  constructor(private http: HttpClient, private config: AppConfig, private observableService: ObservableService) {
  }

  getAuthenticatedContributer(): ManagedObservable<Contributor> {
    return this.observableService.manage(this.http.get<Contributor>(`${this.config.API_ENDPOINT}/contributor`, {withCredentials: true}));
  }

  signUp(dto: SignUpDto): ManagedObservable<Contributor> {
    return this.observableService.manage(this.http.post<Contributor>(`${this.config.API_ENDPOINT}/register`, dto, {withCredentials: true}));
  }

  logIn(dto: LogInDto): ManagedObservable<Contributor> {
    return this.observableService.manage(this.http.post<Contributor>(`${this.config.API_ENDPOINT}/authenticate`, dto, {withCredentials: true}));
  }

  logOut(): ManagedObservable<void> {
    return this.observableService.manage(this.http.post<void>(`${this.config.API_ENDPOINT}/logOut`, {}, {withCredentials: true}));
  }
}

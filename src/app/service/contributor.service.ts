import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { LogInDto } from '../dto/LogInDto';
import { SignUpDto } from '../dto/SignUpDto';
import { Contributor } from '../model/Contributor';
import { EntityManager } from '../model/EntityManager';
import { AppConfig } from '../util/AppConfig';
import { ManagedObservable } from '../util/ManagedObservable';
import { HttpService } from '../util/service/http.service';
import { ObservableService } from '../util/service/observable.service';

@Injectable({
  providedIn: 'root'
})
export class ContributorService {
  constructor(private http: HttpService, private config: AppConfig, private observableService: ObservableService) {
  }

  getAuthenticatedContributor(): ManagedObservable<Contributor | null> {
    return this.observableService.manage(this.http.get(`${this.config.API_ENDPOINT}/contributor`).pipe(map(contributor => EntityManager.deserializeNullable(contributor, Contributor))));
  }

  signUp(dto: SignUpDto): ManagedObservable<Contributor> {
    return this.observableService.manage(this.http.post(`${this.config.API_ENDPOINT}/register`, dto).pipe(map(contributor => EntityManager.deserialize(contributor, Contributor))));
  }

  logIn(dto: LogInDto): ManagedObservable<Contributor> {
    return this.observableService.manage(this.http.post(`${this.config.API_ENDPOINT}/authenticate`, dto).pipe(map(contributor => EntityManager.deserialize(contributor, Contributor))));
  }

  logOut(): ManagedObservable<void> {
    return this.observableService.manage(this.http.post(`${this.config.API_ENDPOINT}/logOut`, {}));
  }
}

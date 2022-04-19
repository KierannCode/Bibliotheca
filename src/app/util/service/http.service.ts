import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AppConfig } from '../AppConfig';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  authenticationToken = '';

  constructor(private config: AppConfig, private client: HttpClient) {
    let authenticationToken = localStorage.getItem(this.config.AUTHENTICATION_TOKEN_HEADER);
    if (authenticationToken != null) {
      this.authenticationToken = authenticationToken;
    }
  }

  prepare(observable: Observable<any>): Observable<any> {
    return observable.pipe(map(response => {
      let headers = response.headers;
      if (headers.has(this.config.AUTHENTICATION_TOKEN_HEADER)) {
        this.authenticationToken = headers.get(this.config.AUTHENTICATION_TOKEN_HEADER);
        localStorage.setItem(this.config.AUTHENTICATION_TOKEN_HEADER, this.authenticationToken);
      }
      return response.body;
    }));
  }

  get(url: string): Observable<any> {
    let observable;
    if (this.authenticationToken != null) {
      observable = this.client.get(url, { headers: { [this.config.AUTHENTICATION_TOKEN_HEADER]: this.authenticationToken }, observe: 'response' })
    } else {
      observable = this.client.get(url, { observe: 'response' });
    }
    return this.prepare(observable);
  }

  post(url: string, body: any): Observable<any> {
    let observable;
    if (this.authenticationToken != null) {
      observable = this.client.post(url, body, { headers: { [this.config.AUTHENTICATION_TOKEN_HEADER]: this.authenticationToken }, observe: 'response' })
    } else {
      observable = this.client.post(url, body, { observe: 'response' });
    }
    return this.prepare(observable);
  }
}

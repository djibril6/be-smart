import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../../../models/user.model';
import { AppConfig } from '../../../config/app.config';

type EntityResponseType = HttpResponse<User>;

@Injectable()
export class LoginService {

  link = 'user/';

  constructor(private httpClient: HttpClient, private ac: AppConfig) { }

  login(data): Observable<EntityResponseType> {
    const url = this.ac.MAIN_URL + this.link + 'auth';
    return this.httpClient
        .post<User>(url, data, {observe: 'response'});
  }
}
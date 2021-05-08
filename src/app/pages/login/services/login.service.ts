import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../../../models/user.model';
import { AppConfig } from '../../../config/app.config';

type EntityResponseType = HttpResponse<User>;
type djibRespınse = HttpResponse<any>;

@Injectable()
export class LoginService {

  link = 'user/';

  constructor(private httpClient: HttpClient, private ac: AppConfig) { }

//   getAllUser(structure: string): Observable<EntityResponseTypeAll> {
//     const url = this.gb.MAIN_URL + this.link + 'get/all/' + structure;
//     return this.httpClient
//         .get<AllUser>(url, {observe: 'response'});
//   }

  login(data): Observable<EntityResponseType> {
    const url = this.ac.MAIN_URL + this.link + 'auth';
    return this.httpClient
        .post<User>(url, data, {observe: 'response'});
  }

//   AddUser(data): Observable<EntityResponseType> {
//     const url = this.gb.MAIN_URL + this.link + 'add';
//     return this.httpClient
//         .post<User>(url, data, {observe: 'response'});
//   }

//   updateUser(id, data): Observable<EntityResponseType> {
//     const url = this.gb.MAIN_URL + this.link + 'update/' + id;
//     return this.httpClient
//         .patch<User>(url, data, {observe: 'response'});
//   }
}
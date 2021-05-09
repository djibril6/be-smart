import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AllUser, User } from '../../../models/user.model';
import { AppConfig } from '../../../config/app.config';

type EntityResponseType = HttpResponse<User>;
type EntityResponseTypeAll = HttpResponse<AllUser>;

@Injectable()
export class UserService {

  link = 'user/';
  reqHeader: HttpHeaders;

  constructor(private httpClient: HttpClient, private vg: AppConfig) { }

  getAllUser(): Observable<EntityResponseTypeAll> {
    this.reqHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.vg.token);
    const url = this.vg.MAIN_URL + this.link + 'get/all';
    return this.httpClient
        .get<AllUser>(url, {headers : this.reqHeader, observe: 'response'});
  }

  getOneUser(id): Observable<EntityResponseType> {
    this.reqHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.vg.token);
    const url = this.vg.MAIN_URL + this.link + 'get/one/' + id;
    return this.httpClient
        .get<User>(url, {headers : this.reqHeader, observe: 'response'});
  }

  AddUser(data): Observable<EntityResponseType> {
    this.reqHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.vg.token);
    const url = this.vg.MAIN_URL + this.link + 'add';
    return this.httpClient
        .post<User>(url, data, {headers : this.reqHeader, observe: 'response'});
  }

  updateUser(id, data): Observable<EntityResponseType> {
    this.reqHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.vg.token);
    const url = this.vg.MAIN_URL + this.link + 'update/' + id;
    return this.httpClient
        .patch<User>(url, data, {headers : this.reqHeader, observe: 'response'});
  }

  deleteUser(id): Observable<EntityResponseType> {
    this.reqHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.vg.token);
    const url = this.vg.MAIN_URL + this.link + id;
    return this.httpClient
        .delete<User>(url, {headers : this.reqHeader, observe: 'response'});
  }
}
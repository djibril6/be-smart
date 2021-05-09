import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AllProject, Project } from '../../../models/project.model';
import { AppConfig } from '../../../config/app.config';

type EntityResponseType = HttpResponse<Project>;
type EntityResponseTypeAll = HttpResponse<AllProject>;

@Injectable()
export class ProjectService {

  link = 'project/';
  reqHeader: HttpHeaders;

  constructor(private httpClient: HttpClient, private vg: AppConfig) { }

  getAllProject(): Observable<EntityResponseTypeAll> {
    this.reqHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.vg.token);
    const url = this.vg.MAIN_URL + this.link + 'get/all';
    return this.httpClient
        .get<AllProject>(url, {headers : this.reqHeader, observe: 'response'});
  }

  getOneProject(id): Observable<EntityResponseType> {
    this.reqHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.vg.token);
    const url = this.vg.MAIN_URL + this.link + 'get/one/' + id;
    return this.httpClient
        .get<Project>(url, {headers : this.reqHeader, observe: 'response'});
  }

  getProjectWithKey(key): Observable<EntityResponseTypeAll> {
    this.reqHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.vg.token);
    const url = this.vg.MAIN_URL + this.link + 'get/key/' + key;
    return this.httpClient
        .get<AllProject>(url, {headers : this.reqHeader, observe: 'response'});
  }

  AddProject(data): Observable<EntityResponseType> {
    this.reqHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.vg.token);
    const url = this.vg.MAIN_URL + this.link + 'add';
    return this.httpClient
        .post<Project>(url, data, {headers : this.reqHeader, observe: 'response'});
  }

  updateProject(id, data): Observable<EntityResponseType> {
    this.reqHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.vg.token);
    const url = this.vg.MAIN_URL + this.link + 'update/' + id;
    return this.httpClient
        .patch<Project>(url, data, {headers : this.reqHeader, observe: 'response'});
  }

  updateAdd(id, data): Observable<EntityResponseType> {
    this.reqHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.vg.token);
    const url = this.vg.MAIN_URL + this.link + 'update/add/' + id;
    return this.httpClient
        .patch<Project>(url, data, {headers : this.reqHeader, observe: 'response'});
  }

  deleteProject(id): Observable<EntityResponseType> {
    this.reqHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.vg.token);
    const url = this.vg.MAIN_URL + this.link + id;
    return this.httpClient
        .delete<Project>(url, {headers : this.reqHeader, observe: 'response'});
  }
}
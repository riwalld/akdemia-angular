import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { IntraSession } from '../models/IntraSession';
import { HttpClient } from '@angular/common/http';
import { URL_BASE } from '../conf/constant';

@Injectable({
  providedIn: 'root'
})
export class IntraSessionsService extends CrudService<IntraSession> {

  constructor(http: HttpClient) {
    const url: string = URL_BASE;
    super(http, `${url}/intrasessions`);
  }
}

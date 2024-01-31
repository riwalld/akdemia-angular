import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_BASE } from '../conf/constant';
import { IntraSession } from '../models/IntraSession';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class IntraSessionService extends CrudService<IntraSession>{

  constructor(private http: HttpClient) {
    const url: string = URL_BASE;
    super(http, `${url}/intrasessions`);
  }
}

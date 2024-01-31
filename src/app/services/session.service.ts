import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_BASE } from '../conf/constant';
import { Session } from '../models/Session';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService extends CrudService<Session>{

  constructor(private http: HttpClient) {
    const url: string = URL_BASE;
    super(http, `${url}/sessions`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_BASE } from '../conf/constant';
import { InterSession } from '../models/InterSession';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class InterSessionService extends CrudService<InterSession>{

  constructor(private http: HttpClient) {
    const url: string = URL_BASE;
    super(http, `${url}/intersessions`);
  }
}

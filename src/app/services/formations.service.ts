import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { Formation } from '../models/Formation';
import { HttpClient } from '@angular/common/http';
import { URL_BASE } from '../conf/constant';

@Injectable({
  providedIn: 'root'
})
export class FormationsService extends CrudService<Formation> {
  constructor(http: HttpClient) {
    const url: string = URL_BASE;
    super(http, `${url}/formations`);
  }
}

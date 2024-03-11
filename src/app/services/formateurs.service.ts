import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { Formateur } from '../models/Formateur';
import { URL_BASE } from '../conf/constant';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormateursService extends CrudService<Formateur>{
  constructor(http: HttpClient) {
    const url: string = URL_BASE;
    super(http, `${url}/trainers`);
  }
}

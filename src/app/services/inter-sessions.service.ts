import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { InterSession } from '../models/InterSession';
import { HttpClient } from '@angular/common/http';
import { URL_BASE } from '../conf/constant';

@Injectable({
  providedIn: 'root'
})
export class InterSessionsService extends CrudService<InterSession> {

  constructor(private http: HttpClient) {
    const url: string = URL_BASE;
    super(http, `${url}/intersessions`);
  }

  deleteParticipant(idSession: any, id: any) {
    const url: string = URL_BASE;
    return this.http.delete(`${url}/particularsouscriptions/${idSession}/${id}`);
  }
}

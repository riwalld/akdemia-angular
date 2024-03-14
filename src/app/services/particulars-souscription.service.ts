import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { ParticularSouscription } from '../models/ParticularSouscription';
import { URL_BASE } from '../conf/constant';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParticularsSouscriptionService extends CrudService<ParticularSouscription> {  
  constructor(private http: HttpClient) {
    const url: string = URL_BASE;
    super(http, `${url}/particularsouscriptions`);
  }

  getAllBySession(id: number): Observable<ParticularSouscription[]> {
    const url: string = URL_BASE;
    return this.http.get<ParticularSouscription[]>(`${url}/particularsouscriptions/session/${id}`);
  }

  saveNewParticipant(idSession: any, idParticipant: any) {
    const url: string = URL_BASE;
    return this.http.post(`${url}/particularsouscriptions/session/${idSession}/${idParticipant}`, {});
  }  
}

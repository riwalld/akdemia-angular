import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { HttpClient } from '@angular/common/http';
import { URL_BASE } from '../conf/constant';
import { EmployeeSouscription } from '../models/EmployeeSouscription';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesSouscriptionService extends CrudService<EmployeeSouscription> {
  constructor(private http: HttpClient) {
    const url: string = URL_BASE;
    super(http, `${url}/employeesouscriptions/session`);
  }

  getAllBySession(id: number): Observable<EmployeeSouscription[]> {
    const url: string = URL_BASE;
    return this.http.get<EmployeeSouscription[]>(`${url}/employeesouscriptions/session/${id}`);
  }

  saveNewParticipant(idSession: any, idParticipant: any) {
    const url: string = URL_BASE;
    return this.http.post(`${url}/employeesouscriptions/session/${idSession}/${idParticipant}`, {});
  } 
}

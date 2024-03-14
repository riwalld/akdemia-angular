import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmBoxEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/Employee';
import { EmployeeSouscription } from 'src/app/models/EmployeeSouscription';
import { InterSession } from 'src/app/models/InterSession';
import { IntraSession } from 'src/app/models/IntraSession';
import { Particular } from 'src/app/models/Particular';
import { ParticularSouscription } from 'src/app/models/ParticularSouscription';
import { Session } from 'src/app/models/Session';
import { AlertService } from 'src/app/services/alert.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { EmployeesSouscriptionService } from 'src/app/services/employees-souscription.service';
import { InterSessionsService } from 'src/app/services/inter-sessions.service';
import { IntraSessionsService } from 'src/app/services/intra-sessions.service';
import { ParticularService } from 'src/app/services/particular.service';
import { ParticularsSouscriptionService } from 'src/app/services/particulars-souscription.service';
import { SessionsService } from 'src/app/services/sessions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sessions-infos',
  templateUrl: './sessions-infos.component.html',
  styleUrls: ['./sessions-infos.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate('0.5s ease-in')
      ]),
      transition('* => void', [
        animate('0.5s ease-out', style({transform: 'translateX(100%)'}))
      ])
    ])
  ],
})
export class SessionsInfosComponent implements OnInit {

  typeSession!: string;
  idSession!: any;

  listeEmployees!: EmployeeSouscription;
  listeParticuliers!: ParticularSouscription;
  
  listeAllEmployees: Employee[] = [];
  listeAllParticuliers: Particular[] =[];

  particularSous!: ParticularSouscription;
  employeeSous!: EmployeeSouscription;

  sessionInter!: InterSession;
  sessionIntra!: IntraSession;

  interSessionForm!: FormGroup;
  intraSessionForm!: FormGroup;
  sessionForm!: FormGroup;
  listeEmployeesForm!: FormGroup;
  listeParticuliersForm!: FormGroup;

  selectedParticipantId: any = null;

  constructor(
    private employeeSousService: EmployeesSouscriptionService,
    private particularSousService: ParticularsSouscriptionService,
    private particularService: ParticularService,
    private employeeService: EmployeeService,
    private interSessionService: InterSessionsService,
    private intraSessionService: IntraSessionsService,
    private toastService: ToastrService,
    private route: ActivatedRoute,
    private alert: AlertService,
    private alertService: ConfirmBoxEvokeService
  ) {}

  ngOnInit(): void {
      this.idSession = this.route.snapshot.paramMap.get('id');
      this.typeSession = this.route.snapshot.url[1]?.path || '';

      if (this.typeSession == 'inter') {
        this.getParticularSouscription(this.idSession);
      } else {
        this.getEmployeeSouscription(this.idSession);
      }

      this.getAllParticipants();
      this.getSession(this.idSession);
      this.initForm();
  }

  initForm() {
    this.listeEmployeesForm = new FormGroup({
      employee: new FormControl()
    });

    this.listeParticuliersForm = new FormGroup({
      particular: new FormControl()
    });

    this.sessionForm = new FormGroup({
      code: new FormControl(),
      date: new FormControl(),
      training: new FormControl(),      
    });
  }

  getAllParticipants() {
    this.particularService.getAll().subscribe({
      next: (data) => {
        this.listeAllParticuliers = data;
      },
      error: (err) => {
        this.alert.alertError(err.error !== null ? err.error.message : 'Impossible de récupérer les participants');
      },
    });

    this.employeeService.getAll().subscribe({
      next: (data) => {
        this.listeAllEmployees = data;
      },
      error: (err) => {
        this.alert.alertError(err.error !== null ? err.error.message : 'Impossible de récupérer les participants');
      },
    });
  }

  getSession(id: any) {
    if (this.typeSession == 'inter') {
      this.interSessionService.getById(id).subscribe({
        next: data => {
          if (data) {
            this.sessionForm.patchValue({
              code: data.code,
              date: data.date,
              training: data.training
            });
          }
        },
        error: (err) => {
          this.alert.alertError(err.error !== null ? err.error.message : 'Impossible de récupérer la session');
        }
      })
    } else {
      this.intraSessionService.getById(id).subscribe({
        next: data => {
          if (data) {
            this.sessionForm.patchValue({
              code: data.code,
              date: data.date,
              training: data.training
            });
          }
        },
        error: (err) => {
          this.alert.alertError(err.error !== null ? err.error.message : 'Impossible de récupérer la session');
        }
      })
    }
  }

  getParticularSouscription(id: any) {
    this.particularSousService.getAllBySession(id).subscribe({
      next: data => {
        if (data.length > 0) {
          this.listeParticuliersForm.patchValue({ particular: data });
        }
      },
      error: (err) => {
        this.alert.alertError(err.error !== null ? err.error.message : 'Impossible de récupérer les participants');
      }
    });
  }

  getEmployeeSouscription(id: any) {
    this.employeeSousService.getAllBySession(id).subscribe({
      next: data => {
        if (data.length > 0) {
          this.listeEmployeesForm.patchValue({ employee: data });
        }
      },
      error: (err) => {
        this.alert.alertError(err.error !== null ? err.error.message : 'Impossible de récupérer les participants');
      }
    });
  }

  delete(id: any) {
    this.alertService.customFour('Etes-vous sûr de vouloir effectuer cette suppression?', 'Cette action est irréversible!', 'Confirmer', 'Annuler').subscribe(
      resp => {
        if (resp.success) {
          if (this.typeSession == 'inter') {
            this.interSessionService.deleteParticipant(this.idSession, id).subscribe(() => {
              this.toastService.success('Suppression effectuée avec succès' );
            });
          } else {
            this.intraSessionService.deleteParticipant(this.idSession, id).subscribe(() => {
              this.toastService.success('Suppression effectuée avec succès' );
            });
          }
        }
      },
    )
  }

  save() {
    console.log("participant : " + this.selectedParticipantId + " id session : " + this.idSession);
    if (this.selectedParticipantId && this.idSession) {
      if (this.typeSession == 'inter') {
        console.log("coucou");
        const particularSouscription: ParticularSouscription = {
          status: 'OPEN',
          creationDate: new Date(),
          updateDate: new Date(), 
          interSession: { id: this.idSession } as InterSession,
          particular: { id: this.selectedParticipantId } as Particular
        };

        this.particularSousService.save(particularSouscription).subscribe(
          (value) => this.handleSuccess('inter'),
          (error) => this.handleError(error)
        );
      } else {
        const employeeSouscription: EmployeeSouscription = {
          status: 'OPEN',
          creationDate: new Date(),
          updateDate: new Date(),
          intraSession: { id: this.idSession } as IntraSession,
          employee: { id: this.selectedParticipantId } as Employee
        };
  
        this.employeeSousService.save(employeeSouscription).subscribe(
          (value) => this.handleSuccess('intra'),
          (error) => this.handleError(error)
        );
      }
    }
  }

  onChangeParticulier(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedParticipantId = selectElement.value;
  }

  get particulars() {
    console.log(this.listeEmployeesForm.get('particular')?.value);
    return this.listeParticuliersForm.get('particular')?.value;
  }  

  get employees() {
    console.log(this.listeEmployeesForm.get('employee')?.value);
    return this.listeEmployeesForm.get('employee')?.value;
  }

  private handleSuccess(sessionType: string) {
    this.toastService.success("Enregistrement effectué avec succès !");
    setTimeout(() => {
      sessionType === 'inter' ? this.interSessionForm.reset() : this.intraSessionForm.reset();
      window.location.reload();
    }, 1000);
  }
  
  private handleError(error: any) {
    console.log(error);
    const message = error.error == null ? "Une erreur est survenue lors de l'enregistrement d'une formation" : error.error.message;
    this.toastService.error(message);
  }
  
}

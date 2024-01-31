import { Router } from '@angular/router';
import { InterSessionService } from './../../services/inter-session.service';
import { IntraSessionService } from './../../services/intra-session.service';
import { Component, OnInit } from '@angular/core';
import { IntraSession } from 'src/app/models/IntraSession';
import { InterSession } from 'src/app/models/InterSession';
import { FormGroup } from '@angular/forms';
import { SessionFormService } from '../forms/session-form.service';
import { Training } from 'src/app/models/Training';
import { Trainer } from 'src/app/models/Trainer';
import { TrainerService } from 'src/app/services/trainer.service';
import { TrainingService } from 'src/app/services/training.service';
import { ManagerService } from 'src/app/services/manager.service';
import { Manager } from 'src/app/models/Manager';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent implements OnInit {

  isLoading!: boolean;
  showIntraSess: boolean = false;
  showInterSess: boolean = true;
  showForm: boolean = false;
  sessionForm!: FormGroup;
  sessionTytpe!: string;
  title: string = 'Creer une session';
  mode: string = 'create';
  manager: Partial<Manager> = {};
  trainingToUp: Partial<Training> = {};
  trainerToUp: Partial<Trainer> = {};
  intraSessions: IntraSession[] = [];
  interSessions: InterSession[] = [];
  trainings: Training[] = [];
  trainers: Trainer[] = [];

  constructor(
    private intraSessionService: IntraSessionService,
    private interSessionService: InterSessionService,
    private managerService: ManagerService,
    private trainerService: TrainerService,
    private trainingService: TrainingService,
    private sessionEditForm: SessionFormService,
    private toastService: AlertService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.sessionForm = this.sessionEditForm.getSessionForm();
    this.getManager();
    this.getAllInterSessions();
    this.getAllIntraSessions();
    this.getAllTrainer();
    this.getAllTraining();
    this.showInterSess = true;
  }

  getManager() {
    this.managerService.getById(9).subscribe({
      next: data => {
        this.manager = data;
      },
      error: err => {
        console.log(err.error.message);
      }
    })
  }

  getAllTraining() {
    this.trainingService.getAll().subscribe({
      next: data => {
        this.trainings = data;
      },
      error: err => {
        console.log(err.error.message);
      }
    })
  }

  getAllTrainer() {
    this.trainerService.getAll().subscribe({
      next: data => {
        this.trainers = data;
      },
      error: err => {
        console.log(err.error.message);
      }
    })
  }

  getAllIntraSessions() {
    this.isLoading = true;
    this.intraSessionService.getAll().subscribe({
      next: data => {
        this.intraSessions = data;
        this.isLoading = false;
      },
      error: err => {
        console.log(err.error.message);
      }
    })
  }

  getAllInterSessions() {
    this.isLoading = true;
    this.interSessionService.getAll().subscribe({
      next: data => {
        this.interSessions = data;
        this.isLoading = false;
      },
      error: err => {
        console.log(err.error.message);
      }
    })
  }

  handleShowForm() { this.showForm = true; }

  closeForm() {
    this.showForm = false;
    this.mode = "create";
    this.sessionForm.reset();
  }

  submitSession() {
    this.sessionForm.get('manager')?.patchValue(this.manager);
    if (this.mode === 'create') {
      if (this.sessionTytpe == "1") {
        this.interSessionService.save(this.sessionForm.value).subscribe({
          next: data => {
            this.toastService.alertSuccess("Enregistrement effectué avec success !");
            window.location.reload();
          },
          error: err => { console.log(err.error.message); }
        })
      } else if (this.sessionTytpe == "2") {
        this.intraSessionService.save(this.sessionForm.value).subscribe({
          next: data => {
            this.toastService.alertSuccess("Enregistrement effectué avec success !");
            window.location.reload();
          },
          error: err => { console.log(err.error.message); }
        })
      }
    } else if (this.mode === 'update') {
      const id = this.sessionForm.get('id')?.value;
      if (this.sessionTytpe == "1") {
        console.log(this.sessionForm.value);
        this.interSessionService.edit(id, this.sessionForm.value).subscribe({
          next: data => {
            this.toastService.alertSuccess("Modification effectué avec success !");
            window.location.reload();
          },
          error: err => { console.log(err.error.message); }
        })
      } else if (this.sessionTytpe == "2") {
        this.intraSessionService.edit(id, this.sessionForm.value).subscribe({
          next: data => {
            this.toastService.alertSuccess("Modification effectué avec success !");
            window.location.reload();
          },
          error: err => { console.log(err.error.message); }
        })
      }
    }
  }

  showSession(id: number) {
    if (this.showInterSess)
      this.router.navigate([`/sessions/inter/${id}`]);
    else
      this.router.navigate([`/sessions/intra/${id}`]);
  }

  editintertSession(id: number) {
    this.title = "Modifier la session";
    this.mode = "update";
    this.sessionTytpe = "1";
    this.interSessionService.getById(id).subscribe({
      next: data => {
        this.trainerToUp = data.trainer;
        this.trainingToUp = data.training;
        this.sessionForm.patchValue(data);
      },
      error: err => {
        console.log(err.error.message);
      }
    })
    this.showForm = true;
  }

  editintratSession(id: number) {
    this.title = "Modifier la session";
    this.mode = "update";
    this.sessionTytpe = "2";
    this.intraSessionService.getById(id).subscribe({
      next: data => {
        this.trainerToUp = data.trainer;
        this.trainingToUp = data.training;
        this.sessionForm.patchValue(data);
      },
      error: err => {
        console.log(err.error.message);
      }
    })
    this.showForm = true;
  }

  showIntraSession() {
    this.showIntraSess = true;
    this.showInterSess = false;
  }

  showInterSession() {
    this.showInterSess = true;
    this.showIntraSess = false
    this.sessionTytpe = "1"

  }

  onSessionTypeChange(event: any) {
    this.sessionTytpe = event.target.value;
  }

  deleteSession(id: number) { }
}

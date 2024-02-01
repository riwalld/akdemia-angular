import { Router } from '@angular/router';
import { InterSessionService } from './../../services/inter-session.service';
import { IntraSessionService } from './../../services/intra-session.service';
import { Component, OnInit } from '@angular/core';
import { IntraSession } from 'src/app/models/IntraSession';
import { InterSession } from 'src/app/models/InterSession';
import { FormControl, FormGroup } from '@angular/forms';
import { SessionFormService } from '../forms/session-form.service';
import { Training } from 'src/app/models/Training';
import { Trainer } from 'src/app/models/Trainer';
import { TrainerService } from 'src/app/services/trainer.service';
import { TrainingService } from 'src/app/services/training.service';
import { ManagerService } from 'src/app/services/manager.service';
import { Manager } from 'src/app/models/Manager';
import { AlertService } from 'src/app/services/alert.service';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/models/Company';
import { UtilsService } from 'src/app/services/utils.service';
import { SessionService } from 'src/app/services/session.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent implements OnInit {

  minDate: string = new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0];
  minUpdateDate!: string;
  isLoading!: boolean;
  showIntraSess: boolean = false;
  showInterSess: boolean = true;
  showForm: boolean = false;
  sessionForm!: FormGroup;
  isFormThemeLoading!: boolean;
  sessionTytpe!: string;
  title: string = 'Creer une session';
  mode: string = 'create';
  trainingToUp: Partial<Training> = {};
  trainerToUp: Partial<Trainer> = {};
  companyToUp: Partial<Company> = {};
  intraSessions: IntraSession[] = [];
  interSessions: InterSession[] = [];
  trainings: Training[] = [];
  trainers: Trainer[] = [];
  companies: Company[] = [];

  //for search
  interSessionReserved: InterSession[] = [];
  intraSessionReserved: IntraSession[] = [];
  interSessionSearch: InterSession[] = [];
  intraSessionSearch: IntraSession[] = [];

  //for filter
  filterForm!: FormGroup;
  searchForm!: FormGroup;
  //for pagination
  page: number = 1;

  constructor(
    private intraSessionService: IntraSessionService,
    private alert: AlertService,
    private interSessionService: InterSessionService,
    private trainerService: TrainerService,
    private trainingService: TrainingService,
    private companyService: CompanyService,
    private sessionEditForm: SessionFormService,
    private toastService: AlertService,
    private utilsService: UtilsService,
    private router: Router

  ) { }

  ngOnInit(): void {

    this.sessionForm = this.sessionEditForm.getSessionForm();
    this.getAllInterSessions();
    this.getAllIntraSessions();
    this.getAllTrainer();
    this.getAllTraining();
    this.getAllCompanies();
    this.initForms();
  }


  initForms() {
    this.searchForm = new FormGroup({
      keyWord: new FormControl('')
    });

    this.filterForm = new FormGroup({
      filter: new FormControl(20)
    })
  }

  searchByName() {
  
    if(this.showInterSess){
      this.interSessions = this.interSessionReserved;
      let table: InterSession[] = [];
      for (let i = 0; i < this.interSessions.length; i++) {
        if (this.interSessions[i].code.toLowerCase().includes(this.searchForm.value.keyWord.toLowerCase())) {
          table.push(this.interSessions[i]);
        }
      }
      if (this.searchForm.value.keyWord.trim() == "") {
        this.intraSessions = this.intraSessionReserved;
      } else {
        this.interSessions = table;
      }
    }
    //for intra session
    else{
      this.intraSessions = this.intraSessionReserved;
      let table: IntraSession[] = [];
      for (let i = 0; i < this.intraSessions.length; i++) {
        if (this.intraSessions[i].code.toLowerCase().includes(this.searchForm.value.keyWord.toLowerCase())) {
          table.push(this.intraSessions[i]);
        }
      }
      if (this.searchForm.value.keyWord.trim() == "") {
        this.intraSessions = this.intraSessionReserved;
      } else {
        this.intraSessions = table;
      }
    }
  }

  // getMinDate() {
  //   const currentDate = new Date();
  //   const minDate = new Date();
  //   minDate.setMonth(currentDate.getMonth() + 3);
  // }

  handlePageChange(event: number) {
    this.page = event;
  }

  getAllTraining() {
    this.trainingService.getAll().subscribe({
      next: data => {
        this.trainings = data;
      },
      error: (err) => {
        this.alert.alertError(err.error !== null ? err.error.message : 'Impossible de récupérer les formations');
      }
    })
  }

  getAllTrainer() {
    this.trainerService.getAll().subscribe({
      next: data => {
        this.trainers = data;
      },
      error: err => {
        this.toastService.alertError(err.error !== null ? err.error.message : 'Impossible de récupérer les formateurs');
      }
    })
  }

  getAllCompanies() {
    this.companyService.getAll().subscribe({
      next: data => {
        this.companies = data;
      },
      error: err => {
        this.toastService.alertError(err.error !== null ? err.error.message : 'Impossible de récupérer les entreprises');
      }
    })
  }

  getAllIntraSessions() {
    this.isLoading = true;
    this.intraSessionService.getAll().subscribe({
      next: data => {
        this.intraSessions = data.filter(s => s.status !== 'CANCELLED');
        this.intraSessionReserved = data.filter(s => s.status !== 'CANCELLED');
        this.isLoading = false;
      },
      error: err => {
        this.toastService.alertError(err.error !== null ? err.error.message : 'Impossible de récupérer les sessions intra');
      }
    })
  }

  getAllInterSessions() {
    this.isLoading = true;
    this.interSessionService.getAll().subscribe({
      next: data => {
        this.interSessions = data.filter(s => s.status !== 'CANCELLED');
        this.interSessionReserved = data.filter(s => s.status !== 'CANCELLED');
        this.isLoading = false;
      },
      error: err => {
        this.toastService.alertError(err.error !== null ? err.error.message : 'Erreur serveur');
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
    this.isFormThemeLoading = true;
    if (this.mode === 'create') {
      if (this.sessionTytpe == "1") {
        this.interSessionService.save(this.sessionForm.value).subscribe({
          next: data => {
            this.toastService.alertSuccess("Enregistrement effectué avec success !");
            this.getAllInterSessions();
            this.showForm = !this.showForm;
            this.isFormThemeLoading = false;
          },
          error: err => {
            this.isFormThemeLoading = false;
            console.log(err);

            this.toastService.alertError(err.error !== null ? err.error.message : 'Erreur serveur');
          }
        })
      } else if (this.sessionTytpe == "2") {
        this.intraSessionService.save(this.sessionForm.value).subscribe({
          next: data => {
            this.toastService.alertSuccess("Enregistrement effectué avec success !");
            this.getAllIntraSessions();
            this.showForm = !this.showForm;
            this.isFormThemeLoading = false;
          },
          error: err => {
            this.isFormThemeLoading = false;
            this.toastService.alertError(err.error !== null ? err.error.message : 'Erreur serveur');
          }
        })
      }
    } else if (this.mode === 'update') {
      const id = this.sessionForm.get('id')?.value;
      if (this.sessionTytpe == "1") {
        this.interSessionService.edit(id, this.sessionForm.value).subscribe({
          next: data => {
            this.toastService.alertSuccess("Modification effectué avec success !");
            this.getAllInterSessions();
            this.showForm = !this.showForm;
            this.isFormThemeLoading = false;
          },
          error: err => {
            this.isFormThemeLoading = false;
            this.toastService.alertError(err.error !== null ? err.error.message : 'Erreur serveur');
          }
        })
      } else if (this.sessionTytpe == "2") {
        this.intraSessionService.edit(id, this.sessionForm.value).subscribe({
          next: data => {
            this.toastService.alertSuccess("Modification effectué avec success !");
            this.getAllIntraSessions();
            this.showForm = !this.showForm;
            this.isFormThemeLoading = false;
          },
          error: err => {
            this.isFormThemeLoading = false;
            this.toastService.alertError(err.error !== null ? err.error.message : 'Erreur serveur');
          }
        })
      }
    }
  }

  goToInterSession(id: number) {
    this.router.navigate([`dashboard/sessions/inter/${id}`]);
  }

  goToIntraSession(id: number) {
    this.router.navigate([`dashboard/sessions/intra/${id}`]);
  }

  editintertSession(id: number) {
    this.title = "Modifier la session";
    this.mode = "update";
    this.sessionTytpe = "1";
    this.interSessionService.getById(id).subscribe({
      next: data => {
        this.trainerToUp = data.trainer;
        this.trainingToUp = data.training;
        this.minUpdateDate = this.addMonthsAndFormat(data.creationDate, 3);
        this.sessionForm.patchValue(data);
      },
      error: err => {
        this.toastService.alertError(err.error !== null ? err.error.message : "une erreur s'est produite lors de la modification de la session inter");
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
        this.companyToUp = data.company;
        console.log(data.date);

        this.minUpdateDate = this.addMonthsAndFormat(data.creationDate, 3);
        this.sessionForm.patchValue(data);
      },
      error: err => {
        this.toastService.alertError(err.error !== null ? err.error.message : "une erreur s'est produite lors de la modification de la session intra");
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
  }

  onSessionTypeChange(event: any) {
    this.sessionTytpe = event.target.value;
  }

  getSubString(text: string) {
    return this.utilsService.getSubString(text, 30);
  }

  // Passer le statut en français
  getStatusString(status: string) {
    switch (status) {
      case 'OPEN':
        return 'Ouvert';
      case 'CLOSED':
        return 'Fermé';
      case 'CANCELLED':
        return 'Annulé';
      case 'COMPLETE':
        return 'Complet';
      case 'ACTIVE':
        return 'Actif';
      case 'WAITING':
        return 'En attente';
      case 'IN_PROGRESS':
        return 'En cours';
      default:
        return 'Statut inconnu';
    }
  }

  // Filtrer la date sur minimum 3 mois
  addMonthsAndFormat(dateString: Date, monthsToAdd: number) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error('La date doit être une chaîne de caractères de format ISO 8601 valide.');
    }
    const newDate = new Date(date.getTime());
    newDate.setMonth(newDate.getMonth() + monthsToAdd);

    return newDate.toISOString().split('T')[0];
  }



  deleteInterSession(id: number) {
    Swal.fire({
      title: 'Etes-vous sûr de vouloir effectuer cette suppression?',
      text: 'Cette action est irréversible!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, Supprimer!',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.interSessionService.delete(id).subscribe(() => {
          this.ngOnInit();
        },
        (err) => {
          this.alert.alertError(err.error !== null ? err.error.message : 'Impossible de supprimer la session inter');
        });
      }
    });
  }

  deleteIntraSession(id: number) {
    Swal.fire({
      title: 'Etes-vous sûr de vouloir effectuer cette suppression?',
      text: 'Cette action est irréversible!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, Supprimer!',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.intraSessionService.delete(id).subscribe(() => {
          this.ngOnInit();
        },
        (err) => {
          this.alert.alertError(err.error !== null ? err.error.message : 'Impossible de supprimer la session intra');
        });
      }
    });
  }
}
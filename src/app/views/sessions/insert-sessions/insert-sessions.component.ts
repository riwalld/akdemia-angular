import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Formateur } from 'src/app/models/Formateur';
import { Formation } from 'src/app/models/Formation';
import { AlertService } from 'src/app/services/alert.service';
import { FormateursService } from 'src/app/services/formateurs.service';
import { FormationsService } from 'src/app/services/formations.service';
import { InterSessionsService } from 'src/app/services/inter-sessions.service';
import { IntraSessionsService } from 'src/app/services/intra-sessions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-insert-sessions',
  templateUrl: './insert-sessions.component.html',
  styleUrls: ['./insert-sessions.component.scss']
})
export class InsertSessionsComponent implements OnInit {
  
  constructor(
    private interSessionService: InterSessionsService,
    private intraSessionsService: IntraSessionsService,
    private formationsService: FormationsService,
    private formateursService: FormateursService,
    private router: Router,
    private route: ActivatedRoute,
    private alert: AlertService
  ) {}

  formateurs: Formateur[] = [];
  formations: Formation[] = [];
  sessionForm!: FormGroup;
  formVisibility!: string;
  isLoading!: boolean;
  idSession!: any;
  isFormEdit!: boolean;
  curentUri!: string;
  title: string = 'Enregistrer une session';

  //employeeValue!: Employee;

  ngOnInit(): void {
    this.idSession = this.route.snapshot.paramMap.get('id');
    if (this.idSession) {
      this.title = "Modifier les informations";
      this.formVisibility = this.route.snapshot.url[1]?.path ||'';
      this.getById(this.idSession);

      this.isFormEdit = true;
    }
    this.getAllFormations();
    this.getAllFormateurs();
    this.initForm();
  }

  cancel() {
    this.router.navigate(['dashboard/sessions']);
  }

  getAllFormations() {
    this.formationsService.getAll().subscribe({
      next: data => {
        this.formations = data;
      },
      error: (err) => {
        this.alert.alertError(err.error !== null ? err.error.message : 'Impossible de récupérer les formations');
      }
    });
  }

  getAllFormateurs() {
    this.formateursService.getAll().subscribe({
      next: data => {
        this.formateurs = data;
      },
      error: (err) => {
        this.alert.alertError(err.error !== null ? err.error.message : 'Impossible de récupérer les formateurs');
      }
    });
  }

  getById(id: any) {
    switch (this.formVisibility) {
      case 'inter':
        this.interSessionService.getById(id).subscribe({
          next: data => {
            this.sessionForm.patchValue(data);
          },
          error: (err) => {
            this.alert.alertError(err.error !== null ? err.error.message : 'Impossible de récupérer l\'identifiant de la session');
          }
        });
        break;
      case 'intra':
        this.intraSessionsService.getById(id).subscribe({
          next: data => {
            this.sessionForm.patchValue(data);
          },
          error: (err) => {
            this.alert.alertError(err.error !== null ? err.error.message : 'Impossible de récupérer l\'identifiant de la session');
          }
        });
        break;
      default:
        break;
    }
  }

  initForm() {
      this.sessionForm = new FormGroup({
        id: new FormControl(''),
        code: new FormControl(''),
        description: new FormControl(''),
        location: new FormControl(''),
        date: new FormControl(),
        creationDate: new FormControl(),
        updateDate: new FormControl(),
        duration: new FormControl(''),
        price: new FormControl(''),
        status: new FormControl(''),
        trainer: new FormControl('M'),
        training: new FormControl(''),
        minParticipant: new FormControl(''),
        company: new FormControl('')        
      });
  }

  updateForm(event: any) {
    this.formVisibility = event.target.value;
  }

  create() {
    this.isLoading = true;
    let form = this.sessionForm.value;
    if(this.idSession) {
      console.log('....MODIFICATION.....');
      console.log(this.idSession);
      if (this.formVisibility == 'inter') {
        console.log(form);

        this.interSessionService.edit(this.idSession, form).subscribe(
          data => {
            this.isLoading = false;
            Swal.fire(
              'Modifié!',
              "La session a été modifié avec succès.",
              'success'
            );
            this.router.navigate(['dashboard/sessions']);
          },
          (err) => {
            this.alert.alertError(err.error !== null ? err.error.message : 'Une erreur s\'est produite lors de la modification de la session');
          }
        )
      } else if (this.formVisibility == "intra") {
        console.log(form);
        this.intraSessionsService.edit(this.idSession, form).subscribe(
          data => {
            this.isLoading = false;
            Swal.fire(
              'Modifié!',
              "La session a été modifiée avec succès.",
              'success'
            );
            this.router.navigate(['dashboard/sessions']);
          },
          (err) => {
            this.alert.alertError(err.error !== null ? err.error.message : 'Une erreur s\'est produite lors de la modification de la session');
          }
        )
      }
    } else {
      if (this.formVisibility == 'inter') {
        console.log('....CREATION.....');
        console.log(form);

        this.interSessionService.save(form).subscribe(
          data => {
            this.isLoading = false;
            Swal.fire(
              'Ajouté!',
              "La session a été ajouté avec succès.",
              'success'
            );

            this.router.navigate(['dashboard/sessions']);
          },
          (err) => {
            this.alert.alertError(err.error !== null ? err.error.message : 'Une erreur s\'est produite lors de l\'ajout de la session');
          }
        )
      } else if(this.formVisibility == 'intra') {
        this.intraSessionsService.save(form).subscribe(
            data => {
              this.isLoading = false;
              Swal.fire(
                'Ajouté!',
                "La session a été ajouté avec succès.",
                'success'
              );
              this.router.navigate(['dashboard/sessions']);
            },
            (err) => {
              this.alert.alertError(err.error !== null ? err.error.message : 'Une erreur s\'est produite lors de l\'ajout de la session');
            }
          )
      }
    }
  }
}

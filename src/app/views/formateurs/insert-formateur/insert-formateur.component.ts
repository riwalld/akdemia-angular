import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { FormateursService } from 'src/app/services/formateurs.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-insert-formateur',
  templateUrl: './insert-formateur.component.html',
  styleUrls: ['./insert-formateur.component.scss']
})
export class InsertFormateurComponent implements OnInit {

  constructor(
    private formateurService: FormateursService,
    private router: Router,
    private route: ActivatedRoute,
    private alert: AlertService
  ) {}

  formateur!: string;
  formateurForm!: FormGroup;
  idFormateur!: any;
  isLoading!: boolean;
  isFormEdit!: boolean;
  curentUri!: string;
  title: string = 'Enregistrer un formateur';

  ngOnInit(): void {
    this.idFormateur = this.route.snapshot.paramMap.get('id');
    if (this.idFormateur) {
      this.title = "Modifier les informations";
      this.getById(this.idFormateur);

      this.isFormEdit = true;
    }
    this.initForm();
  }

  cancel() {
    this.router.navigate(['dashboard/formateurs']);
  }

  getById(id: any) {
    this.formateurService.getById(id).subscribe({
      next: data => {
        this.formateurForm.patchValue(data);
      },
      error: (err) => {
        this.alert.alertError(err.error !== null ? err.error.message : 'Impossible de récupérer l\'identifiant du formateur');
      }
    });
  }

  initForm() {
      this.formateurForm = new FormGroup({
        id: new FormControl(),
        phone: new FormControl(''),
        email: new FormControl('', [Validators.required, Validators.email]),
        address: new FormControl(''),
        photo: new FormControl(''),
        activity: new FormControl(''),
        cvLink: new FormControl(''),
        firstname: new FormControl(''),
        lastname: new FormControl(''),
        gender: new FormControl('M'),
        creationDate: new FormControl(),
        updateDate: new FormControl(),
      });
  }

  create() {
    this.isLoading = true;
    let form = this.formateurForm.value;
    if(this.isFormEdit) {
      console.log(form);

      this.formateurService.edit(this.idFormateur, form).subscribe(
        data => {
          this.isLoading = false;
          Swal.fire(
            'Modifié!',
            "Le formateur a été modifié avec succès.",
            'success'
          );
          this.router.navigate(['dashboard/formateurs']);
        },
        (err) => {
          this.alert.alertError(err.error !== null ? err.error.message : 'Une erreur s\'est produite lors de la modification du formateur');
        }
      )
    } else {
      this.formateurService.save(form).subscribe(
        data => {
          this.isLoading = false;
            Swal.fire(
              'Ajouté!',
              "Le formateur a été ajoutée avec succès.",
              'success'
            );
            this.router.navigate(['dashboard/formateurs']);
        },
        (err) => {
          this.alert.alertError(err.error !== null ? err.error.message : 'Une erreur s\'est produite lors de l\'ajout du formateur');
        }
      )
    }
  }
}

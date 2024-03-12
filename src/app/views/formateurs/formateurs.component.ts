import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Formateur } from 'src/app/models/Formateur';
import { AlertService } from 'src/app/services/alert.service';
import { FormateursService } from 'src/app/services/formateurs.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formateurs',
  templateUrl: './formateurs.component.html',
  styleUrls: ['./formateurs.component.scss']
})
export class FormateursComponent implements OnInit {
  formateurs: Formateur[] = [];
  isLoading!: boolean;

    //for search
    formateursReserved: Formateur[] = [];
    formateurSearch: Formateur[] = [];

    //for filter
    filterForm!: FormGroup;
    searchForm!: FormGroup;

    //for pagination
    page: number = 1;

  constructor(
    private router: Router,
    private formateurService: FormateursService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.getAll();
    this.initForm();
  }


  initForm() {
     this.searchForm = new FormGroup({
      keyWord: new FormControl('')
    });

    this.filterForm = new FormGroup({
      filter: new FormControl(20)
    })
  }

  handlePageChange(event: number) {
    this.page = event;
  }

  searchByName() {
    this.formateurs = this.formateursReserved;
    let table: Formateur[] = [];
    for (let i = 0; i < this.formateurs.length; i++) {
      if (this.formateurs[i].email.toLowerCase().includes(this.searchForm.value.keyWord.toLowerCase())
      || this.formateurs[i].firstname.toLowerCase().includes(this.searchForm.value.keyWord.toLowerCase())) {
        table.push(this.formateurs[i]);
      }
    }
    if (this.searchForm.value.keyWord.trim() == "") {
      this.formateurs = this.formateursReserved;
    } else {
      this.formateurs = table;
    }
  }

  getAll() {
    this.isLoading = true;
    this.formateurService.getAll().subscribe(
      data => {
        this.formateurs = data;
        this.formateursReserved = data;
        this.isLoading = false;
      },
      (err) => {
        this.alert.alertError(err.error !== null ? err.error.message : 'Une erreur s\'est produite lors de la récupération des formateurs');
      }
    );
  }

  goToEdit(id: number) {
    this.router.navigateByUrl(`dashboard/formateurs/${id}`);
  }

  delete(id: number, clientType: string) {
    Swal.fire({
      title: 'Etes-vous sûr de vouloir effectuer cette suppression?',
      text: 'Cette action est irréversible!',
      icon: 'warning',
      cancelButtonText: 'Annuler',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, Supprimer!',
      allowOutsideClick: false,
    }).then((result) => {
      if(result.isConfirmed) {
        this.formateurService.delete(id).subscribe(
          () => {
            this.getAll();
            Swal.fire(
              'Supprimé!',
              'Le formateur a été supprimé avec succès.',
              'success'
            );
          },
          (err) => {
            this.alert.alertError(err.error !== null ? err.error.message : 'Impossible de supprimer un formateur');
          }
        );
      }
    })
  }
}

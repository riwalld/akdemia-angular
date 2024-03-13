import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { InterSession } from 'src/app/models/InterSession';
import { IntraSession } from 'src/app/models/IntraSession';
import { Session } from 'src/app/models/Session';
import { AlertService } from 'src/app/services/alert.service';
import { InterSessionsService } from 'src/app/services/inter-sessions.service';
import { IntraSessionsService } from 'src/app/services/intra-sessions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent implements OnInit {

  sesions: Session[] = [];
  inter: InterSession[] = [];
  intra: IntraSession[] = [];
  isLoading!: boolean;

  showInter: boolean = true;
  showIntra: boolean = false;

  // //for search
  interReserved: InterSession[] = [];
  intraReserved: IntraSession[] = [];

  interSearch: InterSession[] = [];
  intraSearch: IntraSession[] = [];

  // for filter
  filterForm!: FormGroup;
  searchForm!: FormGroup;

  // for pagination
  page: number = 1;

  constructor(
    private router: Router,
    private interService: InterSessionsService,
    private intraService: IntraSessionsService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.getAllInterSessions();
    this.getAllIntraSessions();
    this.initForm();
   }

  initForm() {
    this.searchForm = new FormGroup({
      keyWord: new FormControl('')
    });

    this.filterForm = new FormGroup({
      filter: new FormControl(20)
    });
  }

  handlePageChange(event: number) {
    this.page = event;
  }

  getAllInterSessions() {
    this.interService.getAll().subscribe({
      next: (data) => this.inter = data
    });
  }

  getAllIntraSessions() {
    this.intraService.getAll().subscribe({
      next: (data) => this.intra = data
    });
  }

  searchByName() {

    if(this.showInter){
      this.inter = this.interReserved;
      let table: InterSession[] = [];
      for (let i = 0; i < this.inter.length; i++) {
        if (this.inter[i].description.toLowerCase().includes(this.searchForm.value.keyWord.toLowerCase())
        || this.inter[i].code.toLowerCase().includes(this.searchForm.value.keyWord.toLowerCase())) {
          table.push(this.inter[i]);
        }
      }
      if (this.searchForm.value.keyWord.trim() == "") {
        this.inter = this.interReserved;
      } else {
        this.inter = table;
      }
    }
    //for employee
    else if(this.showIntra){
      this.intra = this.intraReserved;
      let table: IntraSession[] = [];
      for (let i = 0; i < this.intra.length; i++) {
        if (this.intra[i].description.toLowerCase().includes(this.searchForm.value.keyWord.toLowerCase())
        || this.intra[i].code.toLowerCase().includes(this.searchForm.value.keyWord.toLowerCase())) {
          table.push(this.intra[i]);
        }
      }
      if (this.searchForm.value.keyWord.trim() == "") {
        this.intra = this.intraReserved;
      } else {
        this.intra = table;
      }
    }
  }

  goToSessionDetail(id: number, typeSession: string) {
    this.router.navigateByUrl(`dashboard/sessions/${id}`);
  }

  goToEditInter(id: number) {
    this.router.navigateByUrl(`dashboard/sessions/inter/${id}`);
  }

  goToEditIntra(id: number) {
    this.router.navigateByUrl(`dashboard/sessions/intra/${id}`);
  }

  deleteSession(id: number, sessionType: string) {

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
        if(sessionType == 'inter') {
          this.interService.delete(id).subscribe(
            () => {
              this.getAllInterSessions();
              Swal.fire(
                'Supprimé!',
                'La session inter a été supprimé avec succès.',
                'success'
              );
            },
            (err) => {
              this.alert.alertError(err.error !== null ? err.error.message : 'Impossible de supprimer une session inter');
            }
            );
        } else if (sessionType == 'intra') {
          this.intraService.delete(id).subscribe(
            () => {
              this.getAllIntraSessions();
              Swal.fire(
                'supprimé!',
                "La session intra a été supprimé avec succès.",
                'success'
              );
            },
            (err) => {
              this.alert.alertError(err.error !== null ? err.error.message : 'Impossible de supprimer une session intra');
            });
        }
      }
    })
  }

  showIntraSession() {
    this.showIntra = true;
    this.showInter = false;
   }

  showInterSession() {
    this.showIntra = false;
    this.showInter = true;
   }
}

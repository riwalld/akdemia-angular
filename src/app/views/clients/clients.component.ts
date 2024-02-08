import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/Company';
import { Employee } from 'src/app/models/Employee';
import { Particular } from 'src/app/models/Particular';
import { AlertService } from 'src/app/services/alert.service';
import { CompanyService } from 'src/app/services/company.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ParticularService } from 'src/app/services/particular.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  particulars: Particular[] = [];
  employees: Employee[] = [];
  companies: Company[] = [];
  isLoading!: boolean;

  showCmp: boolean = false;
  showEmp: boolean = false;
  showPart: boolean = true;

    //for search
    particularReserved: Particular[] = [];
    employeeReserved: Employee[] = [];
    companyReserved: Company[] = [];

    particularSearch: Particular[] = [];
    companySearch: Particular[] = [];
    employeeSearch: Employee[] = [];

    //for filter
    filterForm!: FormGroup;
    searchForm!: FormGroup;
    //for pagination
    page: number = 1;

  constructor(
    private router: Router,
    private particularService: ParticularService,
    private employeeService: EmployeeService,
    private companyService: CompanyService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.getAllParticipants();
    this.getAllCompanies();
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

    if(this.showPart){
      this.particulars = this.particularReserved;
      let table: Particular[] = [];
      for (let i = 0; i < this.particulars.length; i++) {
        if (this.particulars[i].email.toLowerCase().includes(this.searchForm.value.keyWord.toLowerCase())
        || this.particulars[i].firstname.toLowerCase().includes(this.searchForm.value.keyWord.toLowerCase())) {
          table.push(this.particulars[i]);
        }
      }
      if (this.searchForm.value.keyWord.trim() == "") {
        this.particulars = this.particularReserved;
      } else {
        this.particulars = table;
      }
    }
    //for employee
    else if(this.showEmp){
      this.employees = this.employeeReserved;
      let table: Employee[] = [];
      for (let i = 0; i < this.employees.length; i++) {
        if (this.employees[i].email.toLowerCase().includes(this.searchForm.value.keyWord.toLowerCase())
        || this.employees[i].firstname.toLowerCase().includes(this.searchForm.value.keyWord.toLowerCase())) {
          table.push(this.employees[i]);
        }
      }
      if (this.searchForm.value.keyWord.trim() == "") {
        this.employees = this.employeeReserved;
      } else {
        this.employees = table;
      }
    }
    //for company
    else if(this.showCmp){
      this.companies = this.companyReserved;
      let table: Company[] = [];
      for (let i = 0; i < this.companies.length; i++) {
        if (this.companies[i].email.toLowerCase().includes(this.searchForm.value.keyWord.toLowerCase())
        || this.companies[i].name.toLowerCase().includes(this.searchForm.value.keyWord.toLowerCase())) {
          table.push(this.companies[i]);
        }
      }
      if (this.searchForm.value.keyWord.trim() == "") {
        this.companies = this.companyReserved;
      } else {
        this.companies = table;
      }
    }
  }

  getAllCompanies() {
    this.companyService.getAll().subscribe(
      data => {
        this.companies = data;
        this.companyReserved = data;
      },
      (err) => {
        this.alert.alertError(err.error !== null ? err.error.message : 'Une erreur s\'est produite lors de la récupération des entreprises');
      }
    )
  }

  getAllParticipants() {
    this.isLoading = true;
    this.particularService.getAll().subscribe(
      data => {
        this.particulars = data;
        this.particularReserved = data;
        this.isLoading = false;
      },
      (err) => {
        this.alert.alertError(err.error !== null ? err.error.message : 'Une erreur s\'est produite lors de la récupération des particuliers');
      }
    );

    this.employeeService.getAll().subscribe(
      data => {
        this.employees = data;
        this.employeeReserved = data;
        this.isLoading = false;
      },
      (err) => {
        this.alert.alertError(err.error !== null ? err.error.message : 'Une erreur s\'est produite lors de la récupération des employés');
      }
    );
    this.companyService.getAll().subscribe(
      data => {
        this.companies = data;
        this.companyReserved = data;
        this.isLoading = false;
      },
      (err) => {
        this.alert.alertError(err.error !== null ? err.error.message : 'Une erreur s\'est produite lors de la récupération des entreprises');
      }
    );
  }

  goToEditPart(id: number) {
    this.router.navigateByUrl(`dashboard/clients/particulier/${id}`);
  }

  goToEditClt(id: number) {
    this.router.navigateByUrl(`dashboard/clients/employe/${id}`);
  }

  goToEditCpy(id: number) {
    this.router.navigateByUrl(`dashboard/clients/company/${id}`);
  }

  deleteClients(id: number, clientType: string) {


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
        if(clientType == 'particulier') {
          this.particularService.delete(id).subscribe(
            () => {
              this.getAllParticipants();
              Swal.fire(
                'Supprimé!',
                'Le participant a été supprimé avec succès.',
                'success'
              );
            },
            (err) => {
              this.alert.alertError(err.error !== null ? err.error.message : 'Impossible de supprimer un particulier');
            }
            );
        } else if (clientType == 'employe') {
          this.employeeService.delete(id).subscribe(
            () => {
              this.getAllParticipants();
              Swal.fire(
                'supprimé!',
                "L'employé a été supprimé avec succès.",
                'success'
              );
            },
            (err) => {
              this.alert.alertError(err.error !== null ? err.error.message : 'Impossible de supprimer un employé');
            });
        } else {
          this.companyService.delete(id).subscribe(
            () => {
              this.getAllParticipants();
              Swal.fire(
                'supprimé!',
                "L'entreprise a été supprimée avec succès.",
                'success'
              );
            },
            (err) => {
              this.alert.alertError(err.error !== null ? err.error.message : 'Impossible de supprimer une entreprise');
            });
        }
      }
    })
  }

  showParticular() {
    this.showPart = true;
    this.showCmp = false;
    this.showEmp = false;
   }

  showEmploye() {
    this.showPart = false;
    this.showCmp = false;
    this.showEmp = true;
   }

  showEntreprise() {
    this.showPart = false;
    this.showCmp = true;
    this.showEmp = false;
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/Company';
import { Employee } from 'src/app/models/Employee';
import { Particular } from 'src/app/models/Particular';
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

  constructor(
    private router: Router,
    private particularService: ParticularService,
    private employeeService: EmployeeService,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    this.getAllParticipants();
    this.getAllCompanies();
  }

  getAllCompanies() {
    this.companyService.getAll().subscribe(
      data => {
        this.companies = data
      }
    )
  }

  getAllParticipants() {
    this.isLoading = true;
    this.particularService.getAll().subscribe(
      data => {
        this.isLoading = false;
        this.particulars = data;
      }
    );
    this.employeeService.getAll().subscribe(
      data => {
        this.isLoading = false;
        this.employees = data;
        console.log(this.employees);
        
      }
    );
  }

  goToEdit(id: number) {
    this.router.navigateByUrl(`/clients/${id}`);
  }

  deleteClients(id: number, isEmployee: boolean) {

    const clientType = isEmployee ? 'employé' : 'particulier';

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
      if(result.isConfirmed) {

        if(clientType == 'particulier') {
          this.particularService.delete(id).subscribe(
            () => {
              this.getAllParticipants();
              Swal.fire(
                'supprimé!',
                'Le client a été supprimé avec succès.',
                'success'
              );
            });
        } else if(clientType == 'employé') {
           console.log(id);
          this.employeeService.delete(id).subscribe(
            () => {
              this.getAllParticipants();
              Swal.fire(
                'supprimé!',
                'Le client a été supprimé avec succès.',
                'success'
              );
            });
        } 
      }
    })
    
  }

}

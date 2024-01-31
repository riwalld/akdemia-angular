import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/models/Company';
import { Employee } from 'src/app/models/Employee';
import { Particular } from 'src/app/models/Particular';
import { CompanyService } from 'src/app/services/company.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ParticularService } from 'src/app/services/particular.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-insert-client',
  templateUrl: './insert-client.component.html',
  styleUrls: ['./insert-client.component.scss']
})
export class InsertClientComponent implements OnInit{

  constructor(
    private particularService: ParticularService,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private companyService: CompanyService
  ) {}


  companies: Company[] = [];

  entreprise!: string;
  particulier!: string;
  employe!: string;
  userForm!: FormGroup;
  formVisibility!: string;
  isLoading!: boolean;
  idParticipant!: any;
  isFormEdit!: boolean;

  employeeValue!: Employee;

  ngOnInit(): void {
    this.idParticipant = this.route.snapshot.paramMap.get('id');
    console.log(this.idParticipant);
    if(this.idParticipant) {
      this.getById(this.idParticipant);
      this.isFormEdit = true;
    }
    this.initForm();
    this.getAllCompany();
  }

  getById(id: number) {
    this.employeeService.getById(id).subscribe({
      next: data => {
        this.userForm.patchValue(data);
        if(data?.company != null) {
          console.log("data.company.........." +JSON.stringify(data));
          this.entreprise = data.company.name;
          this.userForm.patchValue(data);
        } else {
          console.log("Pariculier");

        }
      }
    })
    if(this.formVisibility == 'employe') {
      console.log("ID.........." +id);
      // this.employeeService.getById(id).subscribe({
      //   next: data => {

      //     this.userForm.patchValue(data);
      //   }
      // })
    } else {
      console.log("iiiiiiiiiiiiiiiiiiiiiii");
      this.particularService.getById(id).subscribe({
        next: data => {

          console.log(data);

        }
      })
    }
  }

  getAllCompany() {
    this.companyService.getAll().subscribe(
      data => {
        this.companies = data;
        console.log(this.companies);

      }
    )
  }

  initForm() {
      // Sélectionnez la première entreprise du tableau 'companies' comme entreprise par défaut
      this.userForm = new FormGroup({
        company: new FormControl(),
        firstname: new FormControl(''),
        lastname: new FormControl(''),
        activity: new FormControl(''),
        gender: new FormControl('M')
      });
  }

  updateForm(event: any) {
    //this.formVisibility = event.target.value;
  }

  createParticipant() {
    this.isLoading = true;
    let form = this.userForm.value;
    if(this.formVisibility == 'employe') {
      this.employeeService.save(form).subscribe(
        data => {
          this.isLoading = false;
          Swal.fire(
            'Ajouté!',
            "L'employé a été ajouté avec succès.",
            'success'
          );
          console.log(data);

          this.router.navigate(['/clients'])
        }
      )
    } else {
        this.particularService.save(form).subscribe(
          data => {
            this.isLoading = false;
            Swal.fire(
              'Ajouté!',
              "L'employé a été ajouté avec succès.",
              'success'
            );

            this.router.navigate(['/clients'])
          }
        )
      }

    }

  employeeFormValue(){
    this.employeeValue = this.userForm.value;
    this.employeeValue.firstname = this.userForm.value.firstname;
    this.employeeValue.lastname = this.userForm.value.lastname;
    this.employeeValue.company = this.userForm.value.company;
    this.employeeValue.gender = this.userForm.value.gender;

    return this.employeeValue;
  }

}

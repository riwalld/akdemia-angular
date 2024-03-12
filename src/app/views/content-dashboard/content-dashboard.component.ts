import {Component, OnInit} from '@angular/core';
import { Employee } from 'src/app/models/Employee';
import { Formateur } from 'src/app/models/Formateur';
import { Formation } from 'src/app/models/Formation';
import { Particular } from 'src/app/models/Particular';
import {Theme} from 'src/app/models/Theme';
import { AlertService } from 'src/app/services/alert.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { FormateursService } from 'src/app/services/formateurs.service';
import { FormationsService } from 'src/app/services/formations.service';
import { ParticularService } from 'src/app/services/particular.service';
import {ThemeService} from 'src/app/services/theme.service';

@Component({
  selector: 'app-content-dashboard',
  templateUrl: './content-dashboard.component.html',
  styleUrls: ['./content-dashboard.component.scss']
})
export class ContentDashboardComponent implements OnInit {

  constructor(
    private themeService: ThemeService,
    private particularService: ParticularService,
    private employeeService: EmployeeService,
    private formationService : FormationsService,
    private formateurService : FormateursService,
    private alert: AlertService
    ) {}

  listeTheme: Theme[] = [];
  listeFormateurs : Formateur[] = [];
  listeFormations : Formation[] = [];
  listeParticulars : Particular[] = [];
  listeEmployees : Employee[] = [];

  ngOnInit(): void {
    this.getAllParticipants();
    this.getAllFormations();
    this.getAllFormateurs();
    this.loadThemes();
  }

  loadThemes() {
    this.themeService.getAll().subscribe({
      next: (data) => this.listeTheme = data
    })
  }

  getAllFormateurs() {
    this.formateurService.getAll().subscribe(
      data => {
        this.listeFormateurs = data;
      },
      (err) => {
        this.alert.alertError(err.error !== null ? err.error.message : 'Une erreur s\'est produite lors de la récupération des formateurs');
      }
    );
  }

  getAllFormations() {
    this.formationService.getAll().subscribe(
      data => {
        this.listeFormations = data;
      },
      (err) => {
        this.alert.alertError(err.error !== null ? err.error.message : 'Une erreur s\'est produite lors de la récupération des formations');
      }
    );
  }

  getAllParticipants() {
    this.particularService.getAll().subscribe(
      data => {
        this.listeParticulars = data;
      },
      (err) => {
        this.alert.alertError(err.error !== null ? err.error.message : 'Une erreur s\'est produite lors de la récupération des particuliers');
      }
    );

    this.employeeService.getAll().subscribe(
      data => {
        this.listeEmployees = data;
      },
      (err) => {
        this.alert.alertError(err.error !== null ? err.error.message : 'Une erreur s\'est produite lors de la récupération des employés');
      }
    );
  }
}
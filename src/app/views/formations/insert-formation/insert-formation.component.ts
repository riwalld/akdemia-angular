import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { SubTheme } from 'src/app/models/SubTheme';
import { Theme } from 'src/app/models/Theme';
import { AlertService } from 'src/app/services/alert.service';
import { FormationsService } from 'src/app/services/formations.service';
import { SubThemeService } from 'src/app/services/sub-theme.service';
import { ThemeService } from 'src/app/services/theme.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-insert-formation',
  templateUrl: './insert-formation.component.html',
  styleUrls: ['./insert-formation.component.scss']
})
export class InsertFormationComponent implements OnInit {

  formation!: string;
  formationForm!: FormGroup;
  idFormation!: any;
  isLoading!: boolean;
  isFormEdit!: boolean;
  curentUri!: string;
  preview!: string;
  listeSubthemes: SubTheme[] = [];

  selectedFile?: File;
  base64String?: string;
  base64Image?: any;

  constructor(
    private formationService: FormationsService,
    private subthemeService: SubThemeService,
    private router: Router,
    private route: ActivatedRoute,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.idFormation  = this.route.snapshot.paramMap.get('id');
    if (this.idFormation) {
      this.getById(this.idFormation);
    }
    
    this.initForm();
    this.getAllSubThemes();
  }
  
  getAllSubThemes() {
    this.subthemeService.getAll().subscribe(
      (data) => {
        this.listeSubthemes = data;        
      },
      (err) => {
        this.alert.alertError(err.error !== null ? err.error.message : 'Impossible de récupérer les themes');
      }
    );
  }

  cancel() {
    this.router.navigate(['dashboard/catalogues/formations']);
  }

  getById(id: any) {
    this.formationService.getById(id).subscribe({
      next: data => {
        console.log(data);
        this.formationForm.patchValue(data);
      },
      error: (err) => {
        this.alert.alertError(err.error !== null ? err.error.message : 'Impossible de récupérer l\'identifiant de la formation');
      }
    });
  }

  initForm() {
      this.formationForm = new FormGroup({
        id: new FormControl(),
        title: new FormControl(''),
        description: new FormControl(''),
        trainingPrice: new FormControl(''),
        logo: new FormControl(''),
        creationDate: new FormControl(),
        updateDate: new FormControl(),
        subtopics: new FormControl('')
      });
  }

  update() {
    this.isLoading = true;
    let form = this.formationForm.value;
    
    console.log(form);
 
    this.formationService.edit(this.idFormation, form).subscribe(
      data => {
        this.isLoading = false;
        Swal.fire(
          'Modifié!',
          "La formation a été modifié avec succès.",
          'success'
        );
        this.router.navigate(['dashboard/catalogues/formations']);
      },
      (err) => {
        this.alert.alertError(err.error !== null ? err.error.message : 'Une erreur s\'est produite lors de la modification de la formation');
      }
    )
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    this.convertToBase64();
  }

  convertToBase64() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = () => {
        this.base64String = reader.result as string;
        this.formationForm.value.logo = this.base64String;
      }
    } else {
      console.error("Auncun fichier");
    }
  }
}

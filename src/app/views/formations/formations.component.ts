import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmBoxEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Formation } from 'src/app/models/Formation';
import { AlertService } from 'src/app/services/alert.service';
import { FormationsService } from 'src/app/services/formations.service';
import { UtilsService } from 'src/app/services/utils.service';
import { tap } from 'rxjs';
import { ThemeService } from 'src/app/services/theme.service';
import { Theme } from 'src/app/models/Theme';

@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate('0.5s ease-in')
      ]),
      transition('* => void', [
        animate('0.5s ease-out', style({transform: 'translateX(100%)'}))
      ])
    ])
  ]
})
export class FormationsComponent implements OnInit {
  formationForm!: FormGroup;
  formationValue!: Formation;
  modalRef!: NgbModalRef;
  themes: Theme[] = [];

  //for search
  formationsAll: Formation[] = [];
  formationsAllReserved: Formation[] = [];
  formationsSearch: Formation[] = [];

  //for filter
  filterForm!: FormGroup;
  searchForm!: FormGroup;

  //for pagination
  page: number = 1;
  position: number = 1;

  formationUpdateForm!: FormGroup;
  isLoading!: boolean;
  isFormFormationLoading!: boolean;

  selectedFile?: File;
  base64String?: string = "";
  base64Image?: any;

  constructor(
    private formationService: FormationsService,
    private themeService: ThemeService,
    private toastService: ToastrService,
    private utilsService: UtilsService,
    private alert: AlertService,
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: ConfirmBoxEvokeService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getAllFormations();
    this.getAllThemes();
  }

  selectPage(page: string) {
    this.page = parseInt(page, 10) || 1;

  }

  initForm() {
    this.formationForm = new FormGroup({
      title: new FormControl(''),
      logo: new FormControl(''),
      description: new FormControl(''),
      trainingPrice: new FormControl(''),
      subTheme: new FormControl('')
    });

    this.searchForm = new FormGroup({
      keyWord: new FormControl('')
    });

    this.filterForm = new FormGroup({
      filter: new FormControl(20)
    });

    this.formationUpdateForm = this.formBuilder.group({
      id: ['', Validators.required],
      logo: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      trainingPrice: ['', Validators.required],
      creationDate: ['', Validators.required],
      subTheme: ['', Validators.required]
    });
  }

  searchByName() {
    this.formationsAll = this.formationsAllReserved;
    let table: Formation[] = [];
    for (let i = 0; i < this.formationsAll.length; i++) {
      if (this.formationsAll[i].title.toLowerCase().includes(this.searchForm.value.keyWord.toLowerCase())) {
        table.push(this.formationsAll[i]);
      }
    }
    if (this.searchForm.value.keyWord.trim() == "") {
      this.formationsAll = this.formationsAllReserved;
    } else {
      this.formationsAll = table;
    }
  }

  handlePageChange(event: number) {
    this.page = event;
  }

  saveFormation() {
    this.isFormFormationLoading = true;
    let formationSave = this.formationForm.value;
    formationSave.logo = this.base64String;
    this.formationService.save(formationSave).subscribe(
      (value) => {
        let formationResponse = value;
        this.toastService.success("Enregistrement effectué avec succès !");
        this.isFormFormationLoading = false;
        this.formationForm.reset();
        console.log(formationSave)
        setTimeout(() => {
          this.formationForm.reset();
          window.location.reload();
        }, 1000);
      },
      (error) => {
        console.log(error);
        if (error.error == null) {
          this.toastService.error("Une erreur est survenue lors de l'enregistrement d'une formation");
          this.isFormFormationLoading = false;
        } else {
          this.toastService.error(error.error.message);
          this.isFormFormationLoading = false;
        }
      }
    )
  }

  getAllThemes() {
    this.themeService.getAll().subscribe(
      (data) => {
        this.themes = data;        
      },
      (err) => {
        this.alert.alertError(err.error !== null ? err.error.message : 'Impossible de récupérer les themes');
      }
    );
  }

  getAllFormations() {
    this.isLoading = true;
    this.formationService.getAll().subscribe(
      (data) => {
        this.formationsAll = data;
        this.formationsAllReserved = data;
        this.isLoading = false;
      },
      (err) => {
        this.alert.alertError(err.error !== null ? err.error.message : 'Impossible de récupérer les formations');
      }
    );
  }

  formationDelete(id: number) {
    this.alertService.customFour('Etes-vous sûr de vouloir effectuer cette suppression?', 'Cette action est irréversible!', 'Confirmer', 'Annuler').subscribe(
      resp => {
        if (resp.success) {
          console.log(id);
          this.formationService.delete(id).subscribe(() => {
            
            this.getAllFormations();
            this.toastService.success('Supprimé avec succès' );
            this.toastService.success('Suppression effectuée avec succès' );
          });
        }
      },
      (err) => {
        this.toastService.error(err.error !== null? err.error.message : 'Impossible de supprimer la formation');
      }
    )
  }

  gotToFormationEdit(id: number) {
    this.router.navigateByUrl(`dashboard/catalogues/formations/`+id);
  }

  updateFormation() {
    this.isFormFormationLoading = true;
    let formationUpdate = this.formationUpdateForm.value;
    const formationId = formationUpdate.id;
    let creationDate = formationUpdate.creationDate;
    formationUpdate.updateDate = new Date();
    this.formationService.edit(formationId, formationUpdate).pipe(
      tap(
        (value) => {
          let formationResponse = value;
          this.toastService.success("Modification effectuée avec succès!");
          this.isFormFormationLoading = false;
          this.formationUpdateForm.reset();
          setTimeout(() => {
            this.formationUpdateForm.reset();
            window.location.reload();
          }, 10);
        },
        (error) => {
          if (error.error == null) {
            this.toastService.error("Une erreur est survenue lors de l'enregistrement d'une formation");
            this.isFormFormationLoading = false;
          } else {
            this.toastService.error(error.error.message);
            this.isFormFormationLoading = false;
          }
        }
      )
    ).subscribe();
  }

  goToSubTheme() {
    this.router.navigateByUrl(`dashboard/catalogues/themes`);
  }

  getSubString(text: string) {
    return this.utilsService.getSubString(text, 30);
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
      }
    } else {
      console.error("Auncun fichier");
    }
  }
}

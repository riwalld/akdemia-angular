import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { Theme } from 'src/app/models/Theme';
import { AlertService } from 'src/app/services/alert.service';
import Swal from 'sweetalert2';
import { ThemeService } from 'src/app/services/theme.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { UtilsService } from "../../services/utils.service";

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.5s ease-in')
      ]),
      transition('* => void', [
        animate('0.5s ease-out', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ],
})
export class ThemesComponent implements OnInit {

  convert(arg0: number) {
    return Math.ceil(arg0);
  }

  themeForm!: FormGroup;
  themeValue!: Theme;
  modalRef!: NgbModalRef;
  //for search
  themesAll: Theme[] = [];
  themesAllReserved: Theme[] = [];
  themesSearch: Theme[] = [];
  //for filter
  filterForm!: FormGroup;
  searchForm!: FormGroup;
  //for pagination
  page: number = 1;
  position: number = 1;
  
  themeUpdateForm!: FormGroup;
  isLoading!: boolean;
  isFormThemeLoading!: boolean;


  constructor(
    private themeService: ThemeService,
    private toastService: AlertService,
    private utilsService: UtilsService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.themeUpdateForm = this.formBuilder.group({
      id: ['', Validators.required],
      themeTitle: ['', Validators.required],
      description: ['', Validators.required],
      creationDate: ['', Validators.required],
      subThemes: [[]]
    });
  }


  ngOnInit(): void {
    this.innitForm();
    this.getAllThemes();

  }

  selectPage(page: string) {
    this.page = parseInt(page, 10) || 1;

  }

  innitForm() {
    this.themeForm = new FormGroup({
      themeTitle: new FormControl(''),
      description: new FormControl(''),
    });

    this.searchForm = new FormGroup({
      keyWord: new FormControl('')
    });

    this.filterForm = new FormGroup({
      filter: new FormControl(10)
    })
  }

  searchByName() {
    this.themesAll = this.themesAllReserved;
    let table: Theme[] = [];
    for (let i = 0; i < this.themesAll.length; i++) {
      if (this.themesAll[i].themeTitle.toLowerCase().includes(this.searchForm.value.keyWord.toLowerCase())) {
        table.push(this.themesAll[i]);
      }
    }
    if (this.searchForm.value.keyWord.trim() == "") {
      this.themesAll = this.themesAllReserved;
    } else {
      this.themesAll = table;
    }
  }

  handlePageChange(event: number) {
    this.page = event;
  }

  saveTheme() {
    this.isFormThemeLoading = true;
    let themeSave = this.createTheme();
    this.themeService.save(themeSave).pipe(
      tap(
        (value) => {
          let themeResponse = value;
          this.toastService.alertSuccess("Enregistrement effectué avec success !");
          this.isFormThemeLoading = false;
          this.themeForm.reset();
          setTimeout(() => {
            this.themeForm.reset();
            window.location.reload();
          }, 1000);
        },
        (error) => {
          console.log(error);
          if (error.error == null) {
            this.toastService.alertError("Une erreur est survenue lors de l'enregistrement d'un thème");
            this.isFormThemeLoading = false;
          } else {
            this.toastService.alertError(error.error.message);
            this.isFormThemeLoading = false;
          }
        }
      )
    ).subscribe();

  }

  getAllThemes() {
    this.isLoading = true;
    this.themeService.getAll().subscribe(
      (data) => {
        this.themesAll = data;
        this.themesAllReserved = data;
        this.isLoading = false;
      }
    );
  }

  createTheme(): Theme {
    this.themeValue = this.themeForm.value;
    this.themeValue.themeTitle = this.themeForm.value.themeTitle;
    this.themeValue.description = this.themeForm.value.description;
    this.themeValue.creationDate = new Date();
    return this.themeValue;
  }

  themeDelete(id: number) {
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
      if (result.isConfirmed) {
        this.themeService.delete(id).subscribe(() => {
          this.getAllThemes();
          Swal.fire(
            'Supprimé!',
            'Le thème a été supprimé avec succès.',
            'success'
          );
        });
      }
    });
  }

  themeEdit(id: number) {
    this.themeService.getById(id).subscribe((data) => {
      this.themeUpdateForm.patchValue({
        id: data.id,
        themeTitle: data.themeTitle,
        description: data.description,
        creationDate: data.creationDate,
        subThemes: data.subThemes
      });
    });
  }

  updateTheme() {
    this.isFormThemeLoading = true;
    let themeUpdate = this.themeUpdateForm.value;
    const themeId = themeUpdate.id;
    let creationDate = themeUpdate.creationDate;
    themeUpdate.updateDate = new Date();

    this.themeService.edit(themeId, themeUpdate).pipe(
      tap(
        (value) => {
          let themeResponse = value;
          this.toastService.alertSuccess("Modification effectué avec success !");
          this.isFormThemeLoading = false;
          this.themeUpdateForm.reset();
          setTimeout(() => {
            this.themeUpdateForm.reset();
            window.location.reload();
          }, 1000);
        },
        (error) => {
          if (error.error == null) {
            this.toastService.alertError("Une erreur est survenue lors de l'enregistrement d'un thème");
            this.isFormThemeLoading = false;
          } else {
            this.toastService.alertError(error.error.message);
            this.isFormThemeLoading = false;
          }
        }
      )
    ).subscribe();
  }

  themeDetail(id: number) {
    console.log(id);
    this.router.navigate(['catalogues/themes/infos/', id]);
  }

  getSubString(text: string) {
    return this.utilsService.getSubString(text, 30);
  }

}

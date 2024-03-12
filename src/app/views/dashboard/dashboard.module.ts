import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SideBarComponent } from 'src/app/shared/dashboard/side-bar/side-bar.component';
import { NavBarComponent } from 'src/app/shared/dashboard/nav-bar/nav-bar.component';
import { FooterComponent } from 'src/app/shared/dashboard/footer/footer.component';
import { ContentDashboardComponent } from '../content-dashboard/content-dashboard.component';
import { ThemesComponent } from '../themes/themes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ThemesInfosComponent } from '../themes/themes-infos/themes-infos.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormateursComponent } from '../formateurs/formateurs.component';
import { FormationsComponent } from '../formations/formations.component';
import { InsertFormateurComponent } from '../formateurs/insert-formateur/insert-formateur.component';


@NgModule({
  declarations: [
    DashboardComponent,
    SideBarComponent,
    NavBarComponent,
    FooterComponent,
    ContentDashboardComponent,
    ThemesComponent,
    ThemesInfosComponent,
    FormateursComponent,
    FormationsComponent,
    InsertFormateurComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class DashboardModule { }

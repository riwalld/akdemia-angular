import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SideBarComponent } from 'src/app/shared/dashboard/side-bar/side-bar.component';
import { NavBarComponent } from 'src/app/shared/dashboard/nav-bar/nav-bar.component';
import { FooterComponent } from 'src/app/shared/dashboard/footer/footer.component';
import { ContentDashboardComponent } from '../content-dashboard/content-dashboard.component';
import { ThemesComponent } from '../themes/themes.component';
import { FormationsComponent } from '../formations/formations.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { EditFormationComponent } from '../formations/edit-formation/edit-formation.component';
import { ThemesInfosComponent } from '../themes/themes-infos/themes-infos.component';
import { NgbPagination, NgbPaginationNext } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    DashboardComponent,
    SideBarComponent,
    NavBarComponent,
    FooterComponent,
    ContentDashboardComponent,
    ThemesComponent,
    EditFormationComponent,
    ThemesInfosComponent,
    FormationsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class DashboardModule { }

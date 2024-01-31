import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { FormationsComponent } from './views/formations/formations.component';
import { FormateursComponent } from './views/formateurs/formateurs.component';
import { ClientsComponent } from './views/clients/clients.component';
import { SessionsComponent } from './views/sessions/sessions.component';
//import { ThemesInfosComponent } from './views/themes/themes-infos/themes-infos.component';
import { InsertClientComponent } from './views/clients/insert-client/insert-client.component';
import { InsertFormateurComponent } from './views/formateurs/insert-formateur/insert-formateur.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SessionComponent } from './views/sessions/session/session.component';
import {
  ConfirmBoxConfigModule, DialogConfigModule,
  NgxAwesomePopupModule,
  ToastNotificationConfigModule
} from "@costlydeveloper/ngx-awesome-popup";
//import { EditFormationComponent } from './views/formations/edit-formation/edit-formation.component';
//import { ThemesComponent } from './views/themes/themes.component';
//import { ContentDashboardComponent } from './views/content-dashboard/content-dashboard.component';
//import { DashboardComponent } from './views/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    //FormationsComponent,
    FormateursComponent,
    ClientsComponent,
    SessionsComponent,
    //ThemesInfosComponent,
    InsertClientComponent,
    InsertFormateurComponent,
    SessionComponent,
    //EditFormationComponent,
    //ThemesComponent,
    //ContentDashboardComponent,
    //DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    NgSelectModule,
    ToastrModule.forRoot(),
    NgxAwesomePopupModule.forRoot(), // Essential, mandatory main module.
    ConfirmBoxConfigModule.forRoot(), // Needed for instantiating confirm boxes.
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

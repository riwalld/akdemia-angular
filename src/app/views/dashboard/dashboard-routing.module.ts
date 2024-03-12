
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from '../clients/clients.component';
import { InsertClientComponent } from '../clients/insert-client/insert-client.component';
import { ContentDashboardComponent } from '../content-dashboard/content-dashboard.component';
import { ThemesInfosComponent } from '../themes/themes-infos/themes-infos.component';
import { ThemesComponent } from '../themes/themes.component';
import { DashboardComponent } from './dashboard.component';
import { FormationsComponent } from '../formations/formations.component';
import { FormateursComponent } from '../formateurs/formateurs.component';
import { InsertFormateurComponent } from '../formateurs/insert-formateur/insert-formateur.component';
import { InsertFormationComponent } from '../formations/insert-formation/insert-formation.component';
import { SessionsComponent } from '../sessions/sessions.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      {path: '', component: ContentDashboardComponent},
      {path: 'catalogues/themes', component: ThemesComponent},
      {path: 'catalogues/formations', component: FormationsComponent},
      {path: 'catalogues/formations/:id', component: InsertFormationComponent},
      {path: 'formateurs', component: FormateursComponent},
      {path: 'formateurs/insert', component: InsertFormateurComponent},
      {path: 'formateurs/:id', component: InsertFormateurComponent},
      {path: 'sessions', component: SessionsComponent},
      {path: 'clients', component: ClientsComponent},
      {path: 'catalogues/themes/infos/:id', component: ThemesInfosComponent},
      {path: 'clients/insert', component: InsertClientComponent},
      {path: 'clients/:id', component: InsertClientComponent},
      {path: 'clients/employe/:id', component: InsertClientComponent},
      {path: 'clients/particulier/:id', component: InsertClientComponent},
      {path: 'clients/company/:id', component: InsertClientComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

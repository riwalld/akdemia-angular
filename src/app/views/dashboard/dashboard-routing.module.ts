import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ContentDashboardComponent } from '../content-dashboard/content-dashboard.component';
import { ThemesComponent } from '../themes/themes.component';
import { FormationsComponent } from '../formations/formations.component';
import { FormateursComponent } from '../formateurs/formateurs.component';
import { ClientsComponent } from '../clients/clients.component';
import { SessionsComponent } from '../sessions/sessions.component';
import { ThemesInfosComponent } from '../themes/themes-infos/themes-infos.component';
import { EditFormationComponent } from '../formations/edit-formation/edit-formation.component';
import { InsertClientComponent } from '../clients/insert-client/insert-client.component';
import { InsertFormateurComponent } from '../formateurs/insert-formateur/insert-formateur.component';
import { SessionComponent } from '../sessions/session/session.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      {path: '', component: ContentDashboardComponent},
      {path: 'catalogues/themes', component: ThemesComponent},
      {path: 'catalogues/formations', component: FormationsComponent},
      {path: 'formateurs', component: FormateursComponent},
      {path: 'clients', component: ClientsComponent},
      { path: 'sessions', component: SessionsComponent },
      {path: 'sessions/:id', component: SessionComponent},
      {path: 'catalogues/themes/infos/:id', component: ThemesInfosComponent},
      {path: 'catalogues/formations/update/:id', component: EditFormationComponent},
      {path: 'clients/insert', component: InsertClientComponent},
      {path: 'formateurs/insert', component: InsertFormateurComponent},
      {path: 'formateurs/:id', component: InsertFormateurComponent},
      {path: 'clients/:id', component: InsertClientComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

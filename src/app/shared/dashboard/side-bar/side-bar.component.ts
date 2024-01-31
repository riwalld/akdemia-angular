import { Component } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {

  dashboardLink: string = "/"
  themesLink: string = '/catalogues/themes';
  formationsLink: string ="/catalogues/formations";
  formateursLink: string = "/formateurs";
  clientsLink: string = "/clients";
  sessionsLink: string = "/sessions"
  catalogueLink: string = "/catalogues"

}

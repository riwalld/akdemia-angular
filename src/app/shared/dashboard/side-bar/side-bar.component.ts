import { Component } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {

  dashboardLink: string = "/"
  themesLink: string = '/dashboard/catalogues/themes';
  clientsLink: string = "/dashboard/clients";
  catalogueLink: string = "/dashboard/catalogues";

}
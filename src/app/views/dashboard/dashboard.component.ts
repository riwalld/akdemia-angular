import { Component, OnInit } from '@angular/core';
import { Theme } from 'src/app/models/Theme';
import { Trainer } from 'src/app/models/Trainer';
import { Training } from 'src/app/models/Training';
import { ThemeService } from 'src/app/services/theme.service';
import { TrainerService } from 'src/app/services/trainer.service';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent{

}

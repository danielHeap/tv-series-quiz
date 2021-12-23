import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AddTeamModule } from './../add-team/add-team.module';
import { TeamViewModule } from './../team-view/team-view.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsViewComponent } from './teams-view.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  imports: [
    // Internal
    TeamViewModule,
    AddTeamModule,
    // External
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatDividerModule,
  ],
  declarations: [TeamsViewComponent],
})
export class TeamsViewModule {}

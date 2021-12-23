import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamViewComponent } from './team-view.component';
import { DialogConfirmModule } from 'src/app/pure-components/dialog-confirm/dialog-confirm.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    // Internal
    DialogConfirmModule,
    // External
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  exports: [TeamViewComponent],
  declarations: [TeamViewComponent],
})
export class TeamViewModule {}

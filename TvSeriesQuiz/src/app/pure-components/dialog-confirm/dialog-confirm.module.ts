import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DialogConfirmComponent } from './dialog-confirm.component';

@NgModule({
  imports: [
    //Internal
    //Exeternal
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [DialogConfirmComponent],
  declarations: [DialogConfirmComponent],
  providers: [],
})
export class DialogConfirmModule {}

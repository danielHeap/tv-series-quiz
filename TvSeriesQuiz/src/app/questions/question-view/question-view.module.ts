import { DialogConfirmModule } from './../../pure-components/dialog-confirm/dialog-confirm.module';
import { AddQuestionModule } from './../add-question/add-question.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { QuestionViewComponent } from './question-view.component';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [QuestionViewComponent],
  imports: [
    CommonModule,
    // Internal
    AddQuestionModule,
    DialogConfirmModule,
    // External
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatExpansionModule,
  ],
  exports: [QuestionViewComponent],
})
export class QuestionViewModule {}

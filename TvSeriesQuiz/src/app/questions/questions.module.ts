import { AddQuestionModule } from './add-question/add-question.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { QuestionsViewComponent } from './questions-view/questions-view.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { QuestionViewModule } from './question-view/question-view.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { QuestionsRootingModule } from './questions-routing.module';

@NgModule({
  declarations: [QuestionsViewComponent],
  imports: [
    // Internal
    QuestionsRootingModule,
    QuestionViewModule,
    AddQuestionModule,
    // External
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  exports: [QuestionsViewComponent],
})
export class QuestionsModule {}

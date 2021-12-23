import { QuestionsViewComponent } from './questions-view/questions-view.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: '', component: QuestionsViewComponent },
  { path: '**', component: QuestionsViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionsRootingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'questions', loadChildren: () => import('./questions/questions.module').then((m) => m.QuestionsModule) },
  { path: 'teams', loadChildren: () => import('./teams/teams.module').then((m) => m.TeamsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

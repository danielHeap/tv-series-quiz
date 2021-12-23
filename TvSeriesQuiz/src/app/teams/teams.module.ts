import { TeamsViewModule } from './teams-view/teams-view.module';
import { NgModule } from '@angular/core';
import { TeamsRoutingModule } from './team-routing.module';

@NgModule({
  imports: [TeamsRoutingModule, TeamsViewModule],
  declarations: [],
})
export class TeamsModule {}

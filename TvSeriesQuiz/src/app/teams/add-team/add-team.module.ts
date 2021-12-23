import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormErrorsModule } from './../../pure-components/form-errors/form-erros.module';
import { AddTeamComponent } from './add-team.component';

@NgModule({
  imports: [
    // Internal
    FormErrorsModule,
    // External
    MatInputModule,
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
  ],
  declarations: [AddTeamComponent],
  exports: [AddTeamComponent],
})
export class AddTeamModule {}

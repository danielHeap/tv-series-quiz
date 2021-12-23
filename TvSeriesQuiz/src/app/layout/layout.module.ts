import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';

@NgModule({
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatListModule, RouterModule],
  exports: [LayoutComponent],
  declarations: [LayoutComponent],
})
export class LayoutModule {}

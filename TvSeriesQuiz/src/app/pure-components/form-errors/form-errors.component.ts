import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.scss'],
})
export class FormErrorsComponent implements OnInit {
  @Input()
  form!: AbstractControl;
  @Input()
  alwaysShow = false;

  constructor() {}

  ngOnInit() {}

  get minLengthValues() {
    if (this.form.errors == null) {
      return null;
    }

    return this.form.errors['minlength'] as { actualLength: number; requiredLength: number };
  }

  get formErrors() {
    if (this.form.errors == null) {
      return [];
    }
    const result = Object.keys(this.form.errors);
    return result;
  }
}

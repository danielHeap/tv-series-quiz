import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AnswerModel } from './../models/answer.model';
import { v4 as newGuid } from 'uuid';

function init() {
  return {
    id: new FormControl(newGuid(), Validators.required),
    answer: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    isTrue: new FormControl(false, [Validators.required]),
  };
}

export class AnswerForm extends FormGroup {
  get id() {
    return this.get('id') as FormControl;
  }

  get answer() {
    return this.get('answer') as FormControl;
  }

  get isTrue() {
    return this.get('isTrue') as FormControl;
  }

  constructor() {
    super(init());
  }

  public toModel() {
    return new AnswerModel(this.id.value, this.answer.value, this.isTrue.value);
  }
}

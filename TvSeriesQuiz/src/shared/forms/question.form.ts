import { AnswerForm } from './answer.form';
import { QuestionModel } from '../models/question.model';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as newGuid } from 'uuid';

function init() {
  return {
    id: new FormControl(newGuid(), Validators.required),
    question: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    answers: new FormArray([], [Validators.required, Validators.minLength(2)]),
  };
}

export class QuestionForm extends FormGroup {
  get id() {
    return this.get('id') as FormControl;
  }

  get question() {
    return this.get('question') as FormControl;
  }

  get answers() {
    return this.answersArray.controls as AnswerForm[];
  }

  public get answersArray() {
    return this.get('answers') as FormArray;
  }

  constructor() {
    super(init());

    for (let i = 1; i <= 4; i++) {
      this.addAnswer();
    }
  }

  public addAnswer() {
    this.answersArray.push(new AnswerForm());
    this.ensureCorrectAnswerIsSelected();
  }

  public deleteAnswer(answerId: string) {
    const index = this.answers.findIndex((_) => _.id.value === answerId);
    this.answersArray.removeAt(index);
    this.ensureCorrectAnswerIsSelected();
  }

  public setCorrectAnswer(answerId: string) {
    this.answers.forEach((form) => {
      const isTrue = form.id.value === answerId;
      form.patchValue({ isTrue });
    });
  }

  public toModel(): QuestionModel {
    const answers = this.answers.map((_) => _.toModel());

    return new QuestionModel(this.id.value, this.question.value, answers);
  }

  private ensureCorrectAnswerIsSelected() {
    if (this.answersArray.length === 0) {
      return;
    }

    const isSelected = this.answers.some((_) => _.isTrue.value);
    this.answers[0].patchValue({ isTrue: true });
  }
}

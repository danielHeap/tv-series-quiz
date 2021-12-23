import { AnswerForm } from './../../../shared/forms/answer.form';
import { QuestionForm } from './../../../shared/forms/question.form';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { addDoc, collection, Firestore, getFirestore } from 'firebase/firestore';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss'],
})
export class AddQuestionComponent implements OnInit {
  @Output()
  closed = new EventEmitter();
  form = new QuestionForm();

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {}

  setCorrectAnswer(answerForm: AnswerForm) {
    this.form.setCorrectAnswer(answerForm.id.value);
  }

  cancel() {
    this.closed.emit();
  }

  save() {
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      console.log('Form is invalid');
      return;
    }

    const model = JSON.parse(JSON.stringify(this.form.toModel()));
    try {
      addDoc(collection(this.firestore, 'questions'), model)
        .then((docRef) => {
          console.log('Document written with ID: ', docRef.id);
        })
        .catch((e) => {
          console.error('Error adding document: ', e);
        });
    } catch (e) {
      console.error('Error adding document: ', e);
    }

    this.closed.emit();
  }
}

import { QuestionModel } from './../../../shared/models/question.model';
import { AnswerModel } from './../../../shared/models/answer.model';
import { Injectable } from '@angular/core';
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
  QuerySnapshot,
  DocumentData,
  QueryDocumentSnapshot,
  Firestore,
} from 'firebase/firestore';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionViewService {
  private subject = new Subject<QuestionModel[]>();
  private _isLoading: boolean = true;
  public get isLoading() {
    return this._isLoading;
  }

  constructor(private firestore: Firestore) {}

  public getQuestions() {
    this.reloadQuestions();

    return this.subject.asObservable();
  }

  public reloadQuestions() {
    this.getQuestionAsync()
      .then((questions) => {
        this.subject.next(questions);
        this._isLoading = false;
      })
      .catch((e) => console.error(e));
  }

  private async getQuestionAsync() {
    this._isLoading = true;

    const q = query(collection(this.firestore, 'questions'));

    const querySnapshot = await getDocs(q);
    const result: QuestionModel[] = [];
    querySnapshot.forEach((doc) => {
      result.push(this.mapToModel(doc));
    });

    return result;
  }

  private mapToModel(doc: QueryDocumentSnapshot<DocumentData>) {
    const data = doc.data();
    const answers = data['answers'].map((_: AnswerModel) => new AnswerModel(_.id, _.answer, _.isTrue));

    return new QuestionModel(data['id'], data['question'], answers);
  }
}

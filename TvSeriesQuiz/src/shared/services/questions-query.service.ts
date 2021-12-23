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
import { AnswerModel } from '../models/answer.model';
import { QuestionModel } from '../models/question.model';
import { BaseQueryService } from './base-query.service';

@Injectable({
  providedIn: 'root',
})
export class QuestionsQueryService extends BaseQueryService<QuestionModel> {
  constructor(firestore: Firestore) {
    super(firestore, 'questions');
  }

  protected mapToModel(doc: QueryDocumentSnapshot<DocumentData>) {
    const data = doc.data();
    const answers = data['answers'].map((_: AnswerModel) => new AnswerModel(_.id, _.answer, _.isTrue));

    return new QuestionModel(data['id'], data['question'], answers);
  }
}

import { AnswerModel } from './answer.model';

export class QuestionModel {
  constructor(public id: string, public question: string, public answers: AnswerModel[]) {}
}

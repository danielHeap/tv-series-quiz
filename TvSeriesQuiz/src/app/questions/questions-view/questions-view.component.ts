import { Component, OnDestroy, OnInit } from '@angular/core';
import { collection, addDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { Subscription } from 'rxjs';
import { QuestionModel } from 'src/shared/models/question.model';
import { QuestionViewService } from './question-view.service';

@Component({
  selector: 'app-questions-view',
  templateUrl: './questions-view.component.html',
  styleUrls: ['./questions-view.component.scss'],
})
export class QuestionsViewComponent implements OnInit, OnDestroy {
  showAdd = false;
  questions: QuestionModel[] | undefined;
  questionsSub!: Subscription;

  get isLoading() {
    return this.questionViewService.isLoading;
  }

  constructor(private questionViewService: QuestionViewService) {
    this.initData();
  }
  ngOnDestroy(): void {
    this.questionsSub.unsubscribe();
  }

  ngOnInit(): void {}

  openAdd() {
    this.showAdd = true;
  }
  hideAdd() {
    this.showAdd = false;
    this.questionViewService.reloadQuestions();
  }

  private initData() {
    this.questionsSub = this.questionViewService.getQuestions().subscribe((questions) => {
      this.questions = questions;
    });
  }
}

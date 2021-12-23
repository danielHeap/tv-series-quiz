import { Component, OnDestroy, OnInit } from '@angular/core';
import { collection, addDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { Subscription } from 'rxjs';
import { QuestionModel } from 'src/shared/models/question.model';
import { QuestionsQueryService } from 'src/shared/services/questions-query.service';

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

  constructor(private questionViewService: QuestionsQueryService) {
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
    this.questionViewService.reload();
  }

  private initData() {
    this.questionsSub = this.questionViewService.getData().subscribe((questions) => {
      this.questions = questions;
    });
  }
}

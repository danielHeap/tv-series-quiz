import { collection, Firestore, getDoc, getDocs, query, runTransaction, where } from 'firebase/firestore';
import { QuestionViewService } from './../questions-view/question-view.service';
import { DialogConfirmComponent } from './../../pure-components/dialog-confirm/dialog-confirm.component';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QuestionModel } from 'src/shared/models/question.model';
import { doc, deleteDoc } from 'firebase/firestore';

@Component({
  selector: 'app-question-view',
  templateUrl: './question-view.component.html',
  styleUrls: ['./question-view.component.scss'],
})
export class QuestionViewComponent implements OnInit {
  @Input()
  question!: QuestionModel;

  constructor(
    private dialog: MatDialog,
    private questionViewService: QuestionViewService,
    private firestore: Firestore
  ) {}

  ngOnInit(): void {}

  detete() {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteFromStore();
      }
    });
  }

  private async deleteFromStore() {
    try {
      const q = query(collection(this.firestore, 'questions'), where('id', '==', this.question.id));
      const document = await getDocs(q);
      await document.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      this.questionViewService.reloadQuestions();
      console.log('Transaction successfully committed!');
    } catch (e) {
      console.log('Transaction failed: ', e);
    }
  }
}

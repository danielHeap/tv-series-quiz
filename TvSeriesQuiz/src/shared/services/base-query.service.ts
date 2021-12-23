import { Firestore, collection, getDocs, QueryDocumentSnapshot, DocumentData, query } from 'firebase/firestore';
import { Subject } from 'rxjs';
import { AnswerModel } from '../models/answer.model';
import { QuestionModel } from '../models/question.model';

export abstract class BaseQueryService<TModel> {
  private subject = new Subject<TModel[]>();
  private _isLoading: boolean = true;
  public get isLoading() {
    return this._isLoading;
  }

  protected constructor(protected firestore: Firestore, private collectionName: string) {}

  public lockSaving() {
    if (this._isLoading === false) {
      this._isLoading = true;
    }
  }

  public getData() {
    this.reload();

    return this.subject.asObservable();
  }

  public reload() {
    this._isLoading = true;

    this.getDataAsync()
      .then((data) => {
        this.subject.next(data);
        this._isLoading = false;
      })
      .catch((e) => console.error(e));
  }

  protected async getDataAsync() {
    this._isLoading = true;

    const q = query(collection(this.firestore, this.collectionName));

    const querySnapshot = await getDocs(q);
    const result: TModel[] = [];
    querySnapshot.forEach((doc) => {
      result.push(this.mapToModel(doc));
    });

    return result;
  }

  protected abstract mapToModel(doc: QueryDocumentSnapshot<DocumentData>): TModel;
}

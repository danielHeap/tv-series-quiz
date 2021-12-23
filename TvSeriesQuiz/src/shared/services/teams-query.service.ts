import { DocumentData, Firestore, QueryDocumentSnapshot } from 'firebase/firestore';
import { Injectable } from '@angular/core';
import { TeamModel } from '../models/team.model';
import { BaseQueryService } from './base-query.service';

@Injectable({
  providedIn: 'root',
})
export class TeamsQueryService extends BaseQueryService<TeamModel> {
  constructor(firestore: Firestore) {
    super(firestore, 'teams');
  }

  protected mapToModel(doc: QueryDocumentSnapshot<DocumentData>): TeamModel {
    const data = doc.data();

    return new TeamModel(data['id'], data['name'], data['picturePath']);
  }
}

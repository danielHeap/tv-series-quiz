import { TeamsQueryService } from './../../../shared/services/teams-query.service';
import { MatDialog } from '@angular/material/dialog';
import { collection, deleteDoc, Firestore, getDocs, query, where } from 'firebase/firestore';
import { TeamModel } from './../../../shared/models/team.model';
import { Component, Input, OnInit } from '@angular/core';
import { getStorage, ref, getDownloadURL, FirebaseStorage } from 'firebase/storage';
import { DialogConfirmComponent } from 'src/app/pure-components/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  styleUrls: ['./team-view.component.scss'],
})
export class TeamViewComponent implements OnInit {
  @Input()
  team!: TeamModel;
  pictureUrl: string | undefined;

  constructor(private dialog: MatDialog, private firestore: Firestore, private teamsQueryService: TeamsQueryService) {}

  ngOnInit() {
    this.downloadPhoto();
  }

  public delete() {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteFromStore();
      }
    });
  }

  private async deleteFromStore() {
    try {
      const q = query(collection(this.firestore, 'teams'), where('id', '==', this.team.id));
      const document = await getDocs(q);
      await document.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      this.teamsQueryService.reload();
      console.log('Transaction successfully committed!');
    } catch (e) {
      console.log('Transaction failed: ', e);
    }
  }

  private downloadPhoto() {
    if (this.team.picturePath == null) {
      return;
    }

    const storage = getStorage();
    const starsRef = ref(storage, this.team.picturePath);

    // Get the download URL
    getDownloadURL(starsRef)
      .then((url) => {
        this.pictureUrl = url;
      })
      .catch((error) => {
        switch (error.code) {
          case 'storage/object-not-found':
            // File doesn't exist
            break;
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            break;
        }
      });
  }
}

import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TeamForm } from 'src/shared/forms/team.form';
import { addDoc, collection, Firestore } from 'firebase/firestore';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss'],
})
export class AddTeamComponent implements OnInit {
  @Output()
  closed = new EventEmitter();
  @Output()
  saving = new EventEmitter();
  form = new TeamForm();
  completed = false;

  selectedFiles?: FileList;
  selectedFileNames: string[] = [];
  previews: string[] = [];

  constructor(private firestore: Firestore) {}

  ngOnInit() {}

  save() {
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      console.log('Form is invalid');
      return;
    }
    this.saving.emit();
    this.completed = true;
    if (!this.uploadImage()) {
      this.saveToDb();
    }
  }

  cancel() {
    this.closed.emit(false);
  }

  /**
   *
   * @returns Returns indicator if upload is executing
   */

  public selectFiles(event: any): void {
    this.selectedFileNames = [];
    this.selectedFiles = event.target.files;

    this.previews = [];
    if (this.selectedFiles == null || this.selectedFiles.length === 0) {
      return;
    }
    const numberOfFiles = this.selectedFiles.length;
    for (let i = 0; i < numberOfFiles; i++) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.previews.push(e.target.result);
      };

      reader.readAsDataURL(this.selectedFiles[i]);

      this.selectedFileNames.push(this.selectedFiles[i].name);
    }
  }

  private uploadImage() {
    if (this.selectFiles.length !== 1) {
      return false;
    }
    const file = this.selectedFiles?.item(0) as File;
    const storage = getStorage();
    const pictureRef = ref(storage, `${this.form.id.value}/${file.name}`);

    uploadBytes(pictureRef, file).then((snapshot) => {
      this.form.picturePath.setValue(snapshot.metadata.fullPath);
      this.saveToDb();
    });

    return true;
  }

  private saveToDb() {
    const model = JSON.parse(JSON.stringify(this.form.toModel()));
    try {
      addDoc(collection(this.firestore, 'teams'), model)
        .then((docRef) => {
          console.log('Document written with ID: ', docRef.id);
        })
        .catch((e) => {
          console.error('Error adding document: ', e);
        })
        .finally(() => this.closed.emit(true));
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }
}

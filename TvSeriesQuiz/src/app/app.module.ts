import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Analytics, getAnalytics } from 'firebase/analytics';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, MatToolbarModule, MatIconModule],
  providers: [{ provide: Firestore, useFactory: () => getFirestore() }],
  bootstrap: [AppComponent],
})
export class AppModule {
  firebaseApp: FirebaseApp;
  firebaseAnalythics: Analytics;

  constructor() {
    this.firebaseApp = initializeApp(environment.firebaseConfig);
    this.firebaseAnalythics = getAnalytics(this.firebaseApp);
  }
}

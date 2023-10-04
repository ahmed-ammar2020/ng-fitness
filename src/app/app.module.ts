import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { AuthModule } from './auth/auth.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  IConfig,
  NgxMaskDirective,
  NgxMaskPipe,
  provideEnvironmentNgxMask,
} from 'ngx-mask';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NavListComponent } from './navigation/nav-list/nav-list.component';
import { NavToolbarComponent } from './navigation/nav-toolbar/nav-toolbar.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    NavListComponent,
    NavToolbarComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    AuthModule,
    BrowserAnimationsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    FormsModule,
    FlexLayoutModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [provideEnvironmentNgxMask(maskConfig)],
  bootstrap: [AppComponent],
})
export class AppModule {}

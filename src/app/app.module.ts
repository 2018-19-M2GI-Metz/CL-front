import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { mockBackEndInterceptorFactory } from './mock-backend/mock-backend-interceptor';
import { AppComponent } from './app.component';
import { MatDialogModule } from '@angular/material/dialog';
import { GlobalModule } from './composant/global/global.module';
import { ErreurService } from 'services/erreur-pop-up.service';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    GlobalModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: mockBackEndInterceptorFactory,
      deps: [ErreurService],
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  declarations: [AppComponent]
})
export class AppModule { }

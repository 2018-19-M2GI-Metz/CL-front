import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { mockBackEndInterceptorFactory } from './mock-backend/mock-backend-interceptor';
import { AppComponent } from './app.component';
import { MatDialogModule } from '@angular/material/dialog';
import { GlobalModule } from './composant/global/global.module';
import { LogService } from 'services/logger/log.service';

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
      deps: [LogService],
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  declarations: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { mockBackEndInterceptorFactory } from './mockBackend/mock-backend-interceptor';
import { AppComponent } from './app.component';
import { HttpService } from 'services/http-service.service';
import { UserLocationService } from 'services/user-location.service';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: mockBackEndInterceptorFactory,
      multi: true
    },
    HttpService,
    UserLocationService
  ],
  bootstrap: [AppComponent],
  declarations: [AppComponent]
})
export class AppModule { }

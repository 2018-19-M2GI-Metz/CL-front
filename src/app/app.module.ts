import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { mockBackEndInterceptorFactory } from './MockBackend/mock-backend-interceptor';
import { AppComponent } from './app.component';

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
    }
  ],
  bootstrap: [AppComponent],
  declarations: [AppComponent]
})
export class AppModule { }

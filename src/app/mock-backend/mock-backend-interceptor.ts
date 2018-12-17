import { Injectable, Inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { of, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiRest, RestApi } from './mock-api';
import { LogService } from 'services/log.service';
import { catchError } from 'rxjs/operators';
import { TouchSequence } from 'selenium-webdriver';

@Injectable()
class MockBackendInterceptor implements HttpInterceptor {

    constructor(private logService: LogService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const api: RestApi = ApiRest.find(apiRest => request.url.endsWith(apiRest.url) && request.method === apiRest.method);
        if (api) {
            return of(new HttpResponse({ status: 200, body: api.objectToReturn.call(undefined, request) }));
        } else {
            this.logService.set("Une erreur c'est produite lors ", " : l'url n'est pas connu : " + request.url).asError().and.showPopUp().and.log();
            return of(new HttpResponse({ status: 404, body: {} }));
        }
    }
}

@Injectable()
class EmptyBackendInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            url: "http://" + environment.urlServeur + request.url
        });
        return next.handle(request);
    }
}

export function mockBackEndInterceptorFactory(logService: LogService) {
    if (environment.isServeurMock) {
        return new MockBackendInterceptor(logService);
    } else {
        return new EmptyBackendInterceptor();
    }
}

import { Injectable, Inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { of, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiRest, RestApi } from './mock-api';
import { ErreurService } from 'services/erreur-pop-up.service';
import { catchError } from 'rxjs/operators';
import { TouchSequence } from 'selenium-webdriver';

@Injectable()
class MockBackendInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const api: RestApi = ApiRest.find(apiRest => request.url.endsWith(apiRest.url) && request.method === apiRest.method);
        if (api) {
            return of(new HttpResponse({ status: 200, body: api.objectToReturn }));
        }
        return next.handle(request);
    }
}

@Injectable()
class EmptyBackendInterceptor implements HttpInterceptor {

    constructor(private erreurService: ErreurService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            url: "http://" + environment.urlServeur + request.url
        });
        return next.handle(request);
    }
}

export function mockBackEndInterceptorFactory(erreurService: ErreurService) {
    if (environment.isServeurMock) {
        return new MockBackendInterceptor();
    } else {
        return new EmptyBackendInterceptor(erreurService);
    }
}

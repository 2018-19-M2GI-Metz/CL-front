import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiRest, RestApi } from './mock-api';

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
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request);
    }
}

export function mockBackEndInterceptorFactory() {
    if (environment.isServeurMock) {
        return new MockBackendInterceptor();
    } else {
        return new EmptyBackendInterceptor();
    }
}

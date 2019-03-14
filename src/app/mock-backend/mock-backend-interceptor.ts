import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LogService } from 'services/logger/log.service';
import { environment } from '../../environments/environment';
import { IApiRest, ApiRest } from './api';

/**
 * Dans le cas où on utilise pas le serveur
 */
@Injectable()
class MockBackendInterceptor implements HttpInterceptor {

    constructor(private logService: LogService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const api: IApiRest = ApiRest.find(apiRest => request.url.endsWith(apiRest.url) && request.method === apiRest.method);
        if (api) {
            const body = api.objectToReturn.call(undefined, request);
            if (body) {
                return of(new HttpResponse({ status: 200, body: body }));
            } else {
                this.logService.set("Une erreur c'est produite.").asError().and.showPopUp().and.log();
                return of(new HttpResponse({ status: 500, body: {} }));
            }
        } else {
            this.logService.set("Une erreur c'est produite lors ", " : l'url n'est pas connu : " + request.url).asError().and.showPopUp().and.log();
            return of(new HttpResponse({ status: 404, body: {} }));
        }
    }
}

/**
 * Dans le cas où on utilise le serveur
 */
@Injectable()
class EmptyBackendInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            url: "http://" + environment.urlServeur + request.url
        });
        return next.handle(request);
    }
}

/**
 * Permet de définir si on utilise ou non le serveur
 */
export function mockBackEndInterceptorFactory(logService: LogService) {
    if (environment.isServeurMock) {
        return new MockBackendInterceptor(logService);
    } else {
        return new EmptyBackendInterceptor();
    }
}

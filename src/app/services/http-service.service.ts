import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Path } from 'model/path';
import { Place } from 'model/place';
import { Observable, throwError, zip } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private logService: LogService) { }

  public getNearestPosition(positionUser: Place): Promise<Place> {
    return new Promise((res, rej) => {
      const params = new HttpParams().set('lat', positionUser.lat.toString()).set('lon', positionUser.lon.toString());
      this.http.get('/nearestpoint', { params: params }).subscribe((position: Place) => {
        res(position);
      }, err => {
        this.logService.set("Impossible de récuperer le point le plus proche de votre position", err).asError().showPopUp().and.log();
        res(undefined);
      });
    });
  }

  public getAllPositions(): Promise<Place[]> {
    return new Promise((res, rej) => {
      this.http.get('/positions').subscribe((positions: Place[]) => {
        res(positions);
      }, err => {
        this.logService.set("Impossible de récuperer les positions", err).asError().showPopUp().and.log();
        res(undefined);
      });
    });
  }

  public getPath(positions: Place[]): Promise<Path[]> {
    return new Promise((res, rej) => {
      zip(...this.createRequestGPS(positions))
        .pipe(
          catchError(err => {
            this.logService.set("Impossible de récuperer les chemins", err).asError().showPopUp().and.log();
            rej(undefined);
            return throwError({});
          }),
          take(1)
        )
        .subscribe((paths: Path[][]) => {
          res(paths.reduce((accu, x) => accu.concat(x), []));
        });
    });
  }

  getTSP(positions: Place[]): Promise<Path[]> {
    return new Promise((res, rej) => {
      this.createRequestTSP(positions)
        .pipe(
          catchError(err => {
            this.logService.set("Impossible de récuperer les chemins", err).asError().showPopUp().and.log();
            rej(undefined);
            return throwError({});
          }),
          take(1)
        )
        .subscribe((paths: Path[]) => {
          res(paths);
        });
    });
  }

  private createRequestGPS(positions: Place[]): Observable<Path[]>[] {
    return positions.map((_, i) => {
      if (i < positions.length - 1) {
        const params: HttpParams = new HttpParams()
          .set('idStart', positions[i].id.toString())
          .set('idEnd', positions[i + 1].id.toString());
        return this.http.get<Path[]>('/path', { params: params });
      }
    }).filter(o => o);
  }

  private createRequestTSP(positions: Place[]): Observable<Path[]> {
    let params: HttpParams = new HttpParams();
    positions.map(position => params = params.append('id', position.id.toString()));
    return this.http.get<Path[]>('/tsp', { params: params });
  }

  public search(name: string): Promise<Place[]> {
    return new Promise(res => {
      const params: HttpParams = new HttpParams().set('name', name);
      this.http.get('/searchbyname', { params: params }).subscribe((positions: any[]) => {
        res(positions);
      }, err => {
        this.logService.set("Impossible de faire une recherche des villes dispo", err).asError().and.log();
        res(undefined);
      });
    });
  }
}

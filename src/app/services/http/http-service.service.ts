import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Path } from 'model/path';
import { Place } from 'model/place';
import { Observable, throwError, zip } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { LogService } from '../logger/log.service';

/**
 * Service qui permet de réalise les appeles au serveur REST.
 * @see https://github.com/2018-19-M2GI-Metz/CL-server
 */
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private logService: LogService) { }

  public getNearestPosition(positionUser: Place): Promise<Place> {
    return new Promise(res => {
      const params = new HttpParams().set('lat', positionUser.posX.toString()).set('lon', positionUser.posY.toString());
      this.http.get('/nearestpoint', { params: params }).subscribe((position: Place) => {
        res(position);
      }, err => {
        this.logService.set("Impossible de récuperer le point le plus proche de votre position", err).asError().showPopUp().and.log();
        res(undefined);
      });
    });
  }

  public getAllPositions(): Promise<Place[]> {
    return new Promise(res => {
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
    return this.createTuple(positions)
      .map(pos => this.http.get<Path[]>('/path', { params: new HttpParams().set('startId', pos.id1).set('endId', pos.id2) }));
  }

  private createTuple(positions: Place[]): { id1: string, id2: string }[] {
    const tuple: { id1: string, id2: string }[] = [];
    for (let index = 0; index < positions.length - 1; index++) {
      tuple.push({ id1: positions[index].id.toString(), id2: positions[index + 1].id.toString() });
    }
    return tuple;
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

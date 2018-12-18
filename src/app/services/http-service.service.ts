import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Position } from 'model/position';
import { LogService } from './log.service';
import { Path } from 'model/path';
import { Observable, zip, of, throwError } from 'rxjs';
import { catchError, take, tap, map } from 'rxjs/operators';
import { City } from 'model/city';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private logService: LogService) { }

  public getNearestPosition(positionUser: Position): Promise<Position> {
    return new Promise((res, rej) => {
      const params = new HttpParams().set('lat', positionUser.lat.toString()).set('lon', positionUser.lon.toString());
      this.http.get('/nearestpoint', {params: params}).subscribe((position: Position) => {
        res(position);
      }, err => {
        this.logService.set("Impossible de récuperer le point le plus proche de votre position", err).asError().showPopUp().and.log();
        res(undefined);
      });
    });
  }

  public getAllPositions(): Promise<Position[]> {
    return new Promise((res, rej) => {
      this.http.get('/positions').subscribe((positions: Position[]) => {
        res(positions);
      }, err => {
        this.logService.set("Impossible de récuperer les positions", err).asError().showPopUp().and.log();
        res(undefined);
      });
    });
  }

  public getPath(positions: Position[]): Promise<Path[]> {
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

  getTSP(positions: Position[]): Promise<Path[]> {
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

  private createRequestGPS(positions: Position[]): Observable<Path[]>[] {
    return positions.map((_, i) => {
      if (i < positions.length - 1) {
        const params: HttpParams = new HttpParams()
          .set('idStart', positions[i].id.toString())
          .set('idEnd', positions[i + 1].id.toString());
        return this.http.get<Path[]>('/path', { params: params });
      }
    }).filter(o => o);
  }

  private createRequestTSP(positions: Position[]): Observable<Path[]> {
    let params: HttpParams = new HttpParams();
    positions.map(position => params = params.append('id', position.id.toString()));
    return this.http.get<Path[]>('/tsp', { params: params });
  }

  getCites(): Promise<City[]> {
    return this.http.get<City[]>('/cities').pipe(map((cites: City[]) => cites.sort((c1: City, c2: City) => c1.name.localeCompare(c2.name)))).toPromise();
  }
}

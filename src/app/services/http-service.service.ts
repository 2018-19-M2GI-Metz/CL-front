import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Position } from 'model/position';
import { ErreurService } from './erreur-pop-up.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private erreurService: ErreurService) { }

  public getNearestPosition(): Promise<Position> {
    return new Promise((res, rej) => {
      this.http.get('/api/nearestpoint').subscribe((position: Position) => {
        res(position);
      }, err => {
        this.erreurService.setErreur("Impossible de récuperer le point le plus proche de votre position", err).showPopUp().and.log();
        res(undefined);
      });
    });
  }

  public getAllPositions(): Promise<Position[]> {
    return new Promise((res, rej) => {
      this.http.get('/api/positions').subscribe((positions: Position[]) => {
        res(positions);
      }, err => {
        this.erreurService.setErreur("Impossible de récuperer les positions", err).showPopUp().and.log();
        res(undefined);
      });
    });
  }
}

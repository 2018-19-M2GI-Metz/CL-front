import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Position } from 'model/position';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  public getNearestPosition(): Promise<Position> {
    return new Promise((res, rej) => {
      this.http.get('/api/nearestpoint').subscribe((position: Position) => {
        console.log(position);
        res(position);
      }, err => {
        console.log(err);
        rej(err);
      });
    });
  }

  public getAllPositions(): Promise<Position[]> {
    return new Promise((res, rej) => {
      this.http.get('/api/positions').subscribe((positions: Position[]) => {
        console.log(positions);
        res(positions);
      }, err => {
        console.log(err);
        rej(err);
      });
    });
  }
}

import { Injectable } from '@angular/core';
import { Path } from 'model/path';
import { Position } from 'model/position';
import { Subject } from 'rxjs';
import { HttpService } from './http-service.service';
import { City } from 'model/city';

@Injectable({
  providedIn: 'root'
})
export class MapDataService {
  public userPosition: Position;
  public paths: Path[] = [];
  public pointersLocation: Position[] = [];
  public cities: City[];
  private change: Subject<any> = new Subject();

  constructor(private http: HttpService) {
    this.initCities();
  }

  private async initCities() {
    this.cities = await this.http.getCites();
  }

  addPath(...paths: Path[]) {
    this.paths.push(...paths);
    if (paths.length === 1) {
      this.addPointersLocations(paths[0].start, paths[0].end);
    } else {
      this.addPointersLocations(...paths.map(p => p.start));
      if (paths[0].start.id !== paths[paths.length - 1].end.id) {
        this.addPointersLocations(paths[paths.length - 1].end);
      }
    }
    this.notify();
  }

  resetPaths() {
    this.paths = [];
    this.notify();
  }

  addPointersLocations(...positions: Position[]) {
    this.pointersLocation.push(...positions);
    this.notify();
  }

  resetPointersLocations() {
    this.pointersLocation = [];
    this.notify();
  }

  public onChange() {
    return this.change.asObservable();
  }

  private notify() {
    this.change.next();
  }
}

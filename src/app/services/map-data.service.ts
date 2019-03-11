import { Injectable } from '@angular/core';
import { Path } from 'model/path';
import { Place } from 'model/place';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapDataService {
  public paths: Path[] = [];
  public pointersLocation: Place[] = [];
  private change: Subject<any> = new Subject();
  private cityPushed: Subject<any> = new Subject();

  addPath(...paths: Path[]) {
    this.paths.push(...paths);
    if (paths.length === 1) {
      this.addPointersLocations(paths[0].startPlace, paths[0].endPlace);
    } else {
      this.addPointersLocations(...paths.map(p => p.startPlace));
      if (paths[0].startPlace.id !== paths[paths.length - 1].endPlace.id) {
        this.addPointersLocations(paths[paths.length - 1].endPlace);
      }
    }
    this.notify();
  }

  resetPaths() {
    this.paths = [];
    this.notify();
  }

  addPointersLocations(...positions: Place[]) {
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

  public onCityPushed() {
    return this.cityPushed.asObservable();
  }

  public pushCity(city: Place) {
    this.cityPushed.next(city);
  }
}

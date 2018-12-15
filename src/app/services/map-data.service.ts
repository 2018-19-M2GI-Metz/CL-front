import { Injectable } from '@angular/core';
import { Path } from 'model/path';
import { Position } from 'model/position';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapDataService {
  public userPosition: Position;
  public paths: Path[] = [];
  public pointersLocation: Position[] = [];
  private change: Subject<any> = new Subject();

  addPath(...paths: Path[]) {
    this.paths.push(...paths);
    if (paths.length === 1) {
      this.addPointersLocations(paths[0].start, paths[0].end);
    } else {
      this.addPointersLocations(...paths.map(p => p.start));
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

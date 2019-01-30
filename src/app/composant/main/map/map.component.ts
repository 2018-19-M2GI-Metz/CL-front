import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as mappaMundi from 'mappa-mundi';
import { Place } from 'model/place';
import { UserLocationService } from 'services/user-location.service';
import { DrawerService } from 'services/drawer.service';
import { MapDataService } from 'services/map-data.service';

@Component({
  selector: 'cl-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild("map") canvas: ElementRef;
  private map;
  private positions: Place[] = [];

  constructor(
    private userLocationService: UserLocationService,
    private drawerService: DrawerService,
    private mapData: MapDataService) { }

  async ngOnInit() {
    this.initPositions();
    await this.initMap();
    this.drawMap();
  }

  private async initPositions() {
    // this.positions.push(...await this.httpService.getAllPositions());
  }

  private initMap(): Promise<{}> {
    return new Promise(async (res) => {
      const key = 'pk.eyJ1IjoiZGFuaWVscGF5ZXQiLCJhIjoiY2pvem1leGF0Mm1hOTN3cGhmbHM0b3p2ayJ9.s0Gdr8eabQi56tHONKv1Sg';
      const mappa = new mappaMundi('Mapbox', key);
      this.drawerService.setContext(this.canvas.nativeElement.getContext("2d"));
      this.canvas.nativeElement.width = window.innerWidth;
      this.canvas.nativeElement.height = window.innerHeight;
      const userPosition = await this.userLocationService.getUserLocation();
      const options = {
        lat: userPosition ? userPosition.lat : 46.483440,
        lng: userPosition ? userPosition.lon : 2.525914,
        zoom: userPosition ? 10 : 6,
        // style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
      };
      this.map = mappa.tileMap(options);
      this.map.overlay(this.canvas.nativeElement);
      res();
    });
  }

  private drawMap() {
    const updateDraw = () => {
      this.clearMap();
      this.drawUserLocation();
      this.drawLocation();
      this.drawPositions();
      this.drawPaths();
    };
    if (this.map) {
      this.map.onChange(updateDraw);
      this.mapData.onChange().subscribe(updateDraw);
    }
  }

  private drawPaths() {
    if (this.mapData.paths) {
      this.mapData.paths.forEach(path => {
        const startPixels = this.map.latLngToPixel(path.start.lon, path.start.lat);
        const endPixels = this.map.latLngToPixel(path.end.lon, path.end.lat);
        this.drawerService.path(startPixels, endPixels);
      });
    }
  }

  private clearMap() {
    this.drawerService.clear();
  }

  private async drawUserLocation() {
    const userPosition = await this.userLocationService.getUserLocation();
    if (userPosition) {
      const positionPixels = this.map.latLngToPixel(userPosition.lat, userPosition.lon);
      this.drawerService.pointerUser(positionPixels);
    }
  }

  private drawLocation() {
    if (this.mapData.pointersLocation) {
      this.mapData.pointersLocation.forEach(position => {
        const positionPixels = this.map.latLngToPixel(position.lon, position.lat);
        this.drawerService.pointer(positionPixels);
      });
    }
  }

  private drawPositions() {
    this.positions.forEach(position => {
      const positionPixels = this.map.latLngToPixel(position.lon, position.lat);
      this.drawerService.location(positionPixels);
    });
  }
}

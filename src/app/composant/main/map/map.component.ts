import { Component, OnInit, ViewChild, ElementRef, HostListener, AfterViewInit } from '@angular/core';
import * as mappaMundi from 'mappa-mundi';
import { HttpService } from 'services/http-service.service';
import { Position } from 'model/position';
import { UserLocationService } from 'services/user-location.service';
import { DrawerService } from 'services/drawer.service';

@Component({
  selector: 'cl-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  @ViewChild("map") canvas: ElementRef;
  private map;
  private positions: Position[] = [];
  private userPosition: Position;

  constructor(private httpService: HttpService, private userLocationService: UserLocationService, private drawerService: DrawerService) { }

  ngOnInit() {

  }

  async ngAfterViewInit() {
    this.initPositions();
    await this.initUserLocation();
    await this.initMap();
    this.drawMap();
  }

  private async initPositions() {
    this.positions.push(...await this.httpService.getAllPositions());
  }

  private initUserLocation() {
    return new Promise(async (res) => {
      this.userPosition = await this.userLocationService.getUserLocation();
      res();
    });
  }

  private initMap(): Promise<{}> {
    return new Promise(async (res) => {
      const key = 'pk.eyJ1IjoiZGFuaWVscGF5ZXQiLCJhIjoiY2pvem1leGF0Mm1hOTN3cGhmbHM0b3p2ayJ9.s0Gdr8eabQi56tHONKv1Sg';
      const mappa = new mappaMundi('Mapbox', key);
      this.drawerService.setContext(this.canvas.nativeElement.getContext("2d"));
      this.canvas.nativeElement.width = window.innerWidth;
      this.canvas.nativeElement.height = window.innerHeight;
      const options = {
        lat: this.userPosition ? this.userPosition.lat : 0,
        lng: this.userPosition ? this.userPosition.lon : 0,
        zoom: this.userPosition ? 10 : 3,
        // style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
      };
      this.map = mappa.tileMap(options);
      this.map.overlay(this.canvas.nativeElement);
      res();
    });
  }

  private drawMap() {
    if (this.map) {
      this.map.onChange(() => {
        this.clearMap();
        this.drawUserLocation();
        this.drawPositions();
      });
    }
  }

  private clearMap() {
    this.drawerService.clear();
  }

  private drawUserLocation() {
    if (this.userPosition) {
      const positionPixels = this.map.latLngToPixel(this.userPosition.lat, this.userPosition.lon);
      this.drawerService.pointer(positionPixels);
    }
  }

  private drawPositions() {
    this.positions.forEach(position => {
      const positionPixels = this.map.latLngToPixel(position.lon, position.lat);
      this.drawerService.location(positionPixels);
    });
  }
}

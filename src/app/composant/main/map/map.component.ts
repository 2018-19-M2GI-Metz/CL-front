import { Component, OnInit, ViewChild, ElementRef, HostListener, AfterViewInit } from '@angular/core';
import * as mappaMundi from 'mappa-mundi';
import { HttpService } from 'services/http-service.service';
import { Position } from 'model/position';

@Component({
  selector: 'cl-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  @ViewChild("map") canvas: ElementRef;
  private map;
  private ctx;
  private positions: Position[] = [];

  constructor(private httpService: HttpService) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.initMap();
    this.initPositions();
    this.drawMap();
  }

  async initPositions() {
    this.positions.push(...await this.httpService.getAllPositions());
  }

  initMap() {
    const key = 'pk.eyJ1IjoiZGFuaWVscGF5ZXQiLCJhIjoiY2pvem1leGF0Mm1hOTN3cGhmbHM0b3p2ayJ9.s0Gdr8eabQi56tHONKv1Sg';
    const mappa = new mappaMundi('Mapbox', key);
    this.ctx = this.canvas.nativeElement.getContext("2d");
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;
    const options = {
      lat: 0,
      lng: 0,
      zoom: 3,
      // style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
    };

    this.map = mappa.tileMap(options);
    this.map.overlay(this.canvas.nativeElement);
  }

  drawMap() {
    this.map.onChange(() => {
      this.clearMap();
      this.drawPositions();
    });
  }

  clearMap() {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }

  drawPositions() {
    this.positions.forEach(position => {
      const positionPixels = this.map.latLngToPixel(position.lon, position.lat);

      this.ctx.beginPath();
      this.ctx.lineWidth = "6";
      this.ctx.strokeStyle = "red";
      this.ctx.arc(positionPixels.x, positionPixels.y, 20, 0, 2 * Math.PI);
      this.ctx.stroke();
    });
  }

  // @HostListener('window:resize', ['$event'])
  // onResize(event) {
  //   this.canvas.nativeElement.width = window.innerWidth;
  //   this.canvas.nativeElement.height = window.innerHeight;
  // }
}

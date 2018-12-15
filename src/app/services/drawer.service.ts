import { Injectable } from '@angular/core';
import { UserPointerIcons, LocationPointerIcons } from '../composant/main/map/icones/icones';
import { Path } from 'model/path';

const COLORS = {
  blue1: "rgba(63, 81, 188, 0.9)",
  blue2: "rgba(63, 81, 188, 0.7)",
  blue3: "rgba(63, 81, 188, 0.5)",
  white: "rgba(255, 255, 255, 0.6)",
};
@Injectable({
  providedIn: 'root'
})
export class DrawerService {
  private userPointerImage: HTMLImageElement;
  private locationPointerImage: HTMLImageElement;
  private ctx;

  constructor() {
    this.initUserPointer();
    this.initLocationPointer();
  }

  private initUserPointer() {
    this.userPointerImage = new Image();
    this.userPointerImage.src = UserPointerIcons;
    this.userPointerImage.onload = () => { };
  }

  private initLocationPointer() {
    this.locationPointerImage = new Image();
    this.locationPointerImage.src = LocationPointerIcons;
    this.locationPointerImage.onload = () => { };
  }

  setContext(context: any) {
    this.ctx = context;
  }

  clear() {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }

  pointerUser(position: any) {
    const widthOffset = this.userPointerImage.width / 2 - 10;
    const heightOffset = this.userPointerImage.height / 2;
    this.ctx.drawImage(this.userPointerImage, position.x - widthOffset, position.y - heightOffset);
  }

  pointer(position: any) {
    const widthOffset = this.userPointerImage.width / 2 - 10;
    const heightOffset = this.userPointerImage.height / 2;
    this.ctx.drawImage(this.locationPointerImage, position.x - widthOffset, position.y - heightOffset);
  }

  location(position: any) {
    this.ctx.beginPath();
    this.ctx.lineWidth = "1";
    this.ctx.strokeStyle = COLORS.blue1;
    this.ctx.arc(position.x, position.y, 4, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.lineWidth = "2";
    this.ctx.strokeStyle = COLORS.white;
    this.ctx.arc(position.x, position.y, 6, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.lineWidth = "2";
    this.ctx.strokeStyle = COLORS.blue2;
    this.ctx.arc(position.x, position.y, 8, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.lineWidth = "1";
    this.ctx.strokeStyle = COLORS.blue3;
    this.ctx.arc(position.x, position.y, 20, 0, 2 * Math.PI);
    this.ctx.stroke();
  }

  path(start: any, end: any) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = COLORS.blue1;
    this.ctx.moveTo(start.x, start.y);
    this.ctx.lineTo(end.x, end.y);
    this.ctx.stroke();
  }
}

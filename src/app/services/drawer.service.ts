import { Injectable } from '@angular/core';
import { PointerIcons } from '../composant/main/map/icones/icones';

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
  private pointerImage: any;
  private ctx;

  constructor() {
    this.pointerImage = new Image();
    this.pointerImage.src = PointerIcons;
    this.pointerImage.onload = () => { };
  }

  setContext(context: any) {
    this.ctx = context;
  }

  clear() {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }

  pointer(position: any) {
    const widthOffset = this.pointerImage.width / 2 - 10;
    const heightOffset = this.pointerImage.height / 2;
    this.ctx.drawImage(this.pointerImage, position.x - widthOffset, position.y - heightOffset);
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

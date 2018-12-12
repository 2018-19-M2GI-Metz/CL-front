import { Injectable } from '@angular/core';
import { PointerIcons } from '../composant/main/map/icones/icones';

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
    this.ctx.lineWidth = "6";
    this.ctx.strokeStyle = "red";
    this.ctx.arc(position.x, position.y, 20, 0, 2 * Math.PI);
    this.ctx.stroke();
  }
}

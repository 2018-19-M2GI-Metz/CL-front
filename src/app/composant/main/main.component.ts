import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'cl-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  private isMenuOpen = false;

  public isSmallScreen() {
    return window.innerWidth < 640;
  }

  openPanel() {
    this.isMenuOpen = true;
  }

  closePanel() {
    this.isMenuOpen = false;
  }

  getMenuProperties() {
    if (this.isSmallScreen()) {
      return {
        'display': this.isMenuOpen ? 'block' : 'none',
        'width': this.isMenuOpen ? '100%' : '0'
      };
    }
    return {};
  }
}

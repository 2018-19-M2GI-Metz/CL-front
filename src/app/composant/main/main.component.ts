import { Component } from '@angular/core';

/**
 * Fenetre principal de l'application
 */
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

  public openPanel() {
    this.isMenuOpen = true;
  }

  public closePanel() {
    this.isMenuOpen = false;
  }

  public getMenuProperties() {
    if (this.isSmallScreen()) {
      return {
        'display': this.isMenuOpen ? 'block' : 'none',
        'width': this.isMenuOpen ? '100%' : '0'
      };
    }
    return {};
  }
}

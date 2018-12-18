import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MapModule } from './map/map.module';
import { PanelModule } from './panel/panel.module';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [MainComponent],
  imports: [
    MapModule,
    PanelModule,
    CommonModule,
    RouterModule.forChild([{
      path: "",
      component: MainComponent
    }]),
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class MainModule { }

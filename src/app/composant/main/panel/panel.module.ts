import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelRoutingModule } from './panel-routing.module';
import { PanelComponent } from './panel.component';
import { GpsComponent } from './gps/gps.component';
import { TspComponent } from './tsp/tsp.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [PanelComponent, GpsComponent, TspComponent],
  imports: [
    CommonModule,
    PanelRoutingModule,
    MatTabsModule
  ],
  exports: [
    PanelComponent
  ]
})
export class PanelModule { }

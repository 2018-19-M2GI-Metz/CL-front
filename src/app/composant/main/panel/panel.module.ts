import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelRoutingModule } from './panel-routing.module';
import { PanelComponent } from './panel.component';
import { GpsComponent } from './gps/gps.component';
import { TspComponent } from './tsp/tsp.component';
import { MatTabsModule } from '@angular/material/tabs';
import { GlobalModule } from '../../global/global.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [PanelComponent, GpsComponent, TspComponent],
  imports: [
    CommonModule,
    PanelRoutingModule,
    MatTabsModule,
    GlobalModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule
  ],
  exports: [
    PanelComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PanelModule { }

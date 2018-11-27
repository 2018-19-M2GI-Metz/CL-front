import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GpsComponent } from './gps/gps.component';
import { TspComponent } from './tsp/tsp.component';

const routes: Routes = [{
  path: "*",
  pathMatch: "full",
  redirectTo: "gps",
  outlet: 'panel'
},
{
  path: "gps",
  component: GpsComponent,
  outlet: 'panel'
},
{
  path: "tsp",
  component: TspComponent,
  outlet: 'panel'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }

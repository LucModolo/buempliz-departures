import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {DeparturesComponent} from "./departures/departures.component";

const routes: Routes = [
  { path: '', component: DeparturesComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }


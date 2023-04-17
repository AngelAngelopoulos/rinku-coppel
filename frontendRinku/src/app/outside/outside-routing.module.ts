/**
 * @file OutsideRoutingModule
 * @description This module defines the routing for the OutsideComponent.
 * @module OutsideRoutingModule
 */

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { OutsideComponent } from './outside.component';

/**
 * @constant routes
 * @description Represents the routes for OutsideComponent.
 * @type {Routes}
 */
const routes: Routes = [
  {
    path: '', component: OutsideComponent, children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent }
    ]
  },
];

/**
 * @class OutsideRoutingModule
 * @classdesc Represents the routing module for OutsideComponent.
 * @exports OutsideRoutingModule
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutsideRoutingModule {}

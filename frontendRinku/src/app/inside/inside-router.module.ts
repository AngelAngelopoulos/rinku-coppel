/**
 * @file InsideRoutingModule
 * @description This module defines the routing configuration for the Inside module.
 * @module InsideRoutingModule
 */

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { InsideComponent } from './inside.component';
import { EmployeesComponent } from './employees/employees.component';

/**
 * @constant routes
 * @description Represents the routes configuration for the Inside module.
 * @type {Routes}
 */
const routes: Routes = [
  {
    path: '', component: InsideComponent, children: [
      { path: '', redirectTo: 'employees', pathMatch: 'full' },
      { path: 'employees', component: EmployeesComponent },
    ]
  },
];

/**
 * @class InsideRoutingModule
 * @classdesc Represents the routing module for the Inside module.
 * @exports InsideRoutingModule
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsideRoutingModule {}


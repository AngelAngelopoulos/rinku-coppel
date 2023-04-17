/**
 * @file AppRoutingModule
 * @description This module represents the main routing module for the application.
 * @module AppRoutingModule
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/**
 * @constant routes
 * @description The routes configuration for the application.
 * @type {Routes[]}
 */
const routes: Routes = [
  {
    path: '', loadChildren: () => import('./outside/outside.module').then(m => m.OutsideModule)
  },
  {
    path: 'app', loadChildren: () => import('./inside/inside.module').then(m => m.InsideModule)
  }
];

/**
 * @class AppRoutingModule
 * @classdesc Represents the main routing module for the application.
 * @exports AppRoutingModule
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

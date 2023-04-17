/**
 * @file ToolbarComponent
 * @description This component represents the toolbar of the application.
 * @module ToolbarComponent
 */

import { Component, OnInit } from '@angular/core';

/**
 * @class ToolbarComponent
 * @classdesc Represents the toolbar component of the application.
 * @implements OnInit
 */
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  /**
   * @constructor
   * @description Constructs an instance of the ToolbarComponent.
   */
  constructor() { }

  /**
   * @method ngOnInit
   * @description Lifecycle hook that is called after the component has been initialized.
   * This method is empty in this component.
   */
  ngOnInit(): void { }
}

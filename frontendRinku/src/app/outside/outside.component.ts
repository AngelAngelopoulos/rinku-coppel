/**
 * @file OutsideComponent
 * @description This component represents the main component for the outside view.
 * @module OutsideComponent
 */

import { Component, OnInit } from '@angular/core';

/**
 * @class OutsideComponent
 * @classdesc Represents the main component for the outside view.
 * @implements {OnInit}
 */
@Component({
  selector: 'app-outside',
  templateUrl: './outside.component.html',
  styleUrls: ['./outside.component.scss']
})
export class OutsideComponent implements OnInit {

  /**
   * @constructor
   * @description Creates an instance of OutsideComponent.
   */
  constructor() { }

  /**
   * @method ngOnInit
   * @description Lifecycle hook called after component initialization.
   * @returns {void}
   */
  ngOnInit(): void { }
}

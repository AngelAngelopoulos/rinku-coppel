/**
 * @file InsideComponent
 * @description This component represents the main component of the Inside module.
 * @module InsideComponent
 */

import { Component, OnInit } from '@angular/core';

/**
 * @class InsideComponent
 * @classdesc Represents the main component of the Inside module.
 * @implements {OnInit}
 */
@Component({
  selector: 'app-inside',
  templateUrl: './inside.component.html',
  styleUrls: ['./inside.component.scss']
})
export class InsideComponent implements OnInit {

  constructor() { }

  /**
   * @method ngOnInit
   * @description Lifecycle hook that is called after the component has been initialized.
   * @returns {void}
   */
  ngOnInit(): void { }
}

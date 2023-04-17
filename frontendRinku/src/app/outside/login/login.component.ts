/**
 * @file LoginComponent
 * @description This component represents the login functionality of the application.
 * @module LoginComponent
 */

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

/**
 * @class LoginComponent
 * @classdesc Represents the login component.
 * @implements {OnInit}
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: string = '';
  public password: string = '';
  public formGroup: FormGroup;

  constructor(
    private _routingService: Router,
    private _cookieService: CookieService
  ) {
    /**
     * @member formGroup
     * @description Represents the form group for login form.
     * @type {FormGroup}
     */
    this.formGroup = new FormGroup({
      user: new FormControl(
        this.user,
        [ Validators.required ]
      ),
      password: new FormControl(
        this.password,
        [ Validators.required ]
      )
    });
    this.formGroup.updateValueAndValidity();

    if (this._cookieService.get('login') === 'true') {
      this._routingService.navigate(['/app/employees']);
    }
  }

  /**
   * @method ngOnInit
   * @description Lifecycle hook that is called after the component has been initialized.
   * @returns {void}
   */
  ngOnInit(): void {

  }

  /**
   * @method onClick
   * @description Handles click event.
   * @returns {void}
   */
  public onClick = () => {
    //console.log("CLICK");
  }

  /**
   * @method login
   * @description Handles login functionality.
   * @returns {void}
   */
  public login = () => {
    //console.log(this.formGroup.controls['user'].value, this.formGroup.controls['password'].value);
    if (this.formGroup.valid) {
       if (this.formGroup.controls['user'].value === "user123" && this.formGroup.controls['password'].value === "password123") {
      this._cookieService.set('login', 'true');
      this._routingService.navigate(['/app/employees']);
    }
    else {
      this._cookieService.deleteAll();
    }
    }
  }
}

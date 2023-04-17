/**
 * @fileoverview This file contains the implementation of the NewWorkdayModalComponent,
 * which is a dialog component for creating new workdays in an Angular application.
 * It uses Angular Material for dialog functionality and Angular Reactive Forms for form handling.
 *
 * @module NewWorkdayModalComponent
 */

import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employee } from 'src/app/global/services/employees/employees.response';
import { Workday, WorkdayRequest } from 'src/app/global/services/workdays/workdays.response';
import { WorkdaysService } from 'src/app/global/services/workdays/workdays.service';
import { DateUtils, Month } from 'src/app/global/utils/dateutils';

/**
 * Represents the NewWorkdayModalComponent class that implements the logic for creating
 * new workdays in a dialog.
 *
 * @class NewWorkdayModalComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-modal-new-workday',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
/**
 * @class NewWorkdayModalComponent
 * Represents the NewWorkdayModalComponent which is used for creating a new workday entry.
 */
export class NewWorkdayModalComponent implements OnInit {

  /**
   * @property {Employee} employee
   * Represents the employee object for which the workday is being created.
   */
  public employee: Employee;

  /**
   * @property {FormGroup} formGroup
   * Represents the form group used for form validation and handling form data.
   */
  public formGroup: FormGroup;

  /**
   * @property {Array<Month>} months
   * Represents the array of months.
   */
  public months: Array<Month> = [];

  /**
   * @property {Array<number>} years
   * Represents the array of years.
   */
  public years: Array<number> = [];

  /**
   * @property {Month} month
   * Represents the currently selected month.
   */
  public month: Month;

  /**
   * @property {number} year
   * Represents the currently selected year, initialized to 2023 by default.
   */
  public year: number = 2023;

  /**
   * @constructor
   * @param {_workdaysService} _workdaysService
   * Represents the WorkdaysService used for fetching workday data.
   * @param {MAT_DIALOG_DATA} data
   * Represents the data injected into the modal, containing the employee object.
   * @param {_matDialogRef} _matDialogRef
   * Represents the MatDialogRef used for controlling the modal.
   */
  constructor(
    private _workdaysService: WorkdaysService,
    @Inject(MAT_DIALOG_DATA) data: { employee: Employee },
    public _matDialogRef: MatDialogRef<NewWorkdayModalComponent>
  ) {
    this.months = DateUtils.Months;
    this.years = Array.from({ length: 23 }, (v, k) => k + 2010);
    this.month = this.months[0];
    this.employee = data.employee;
    this.formGroup = new FormGroup({
      workdayDeliveries: new FormControl(
        0,
        [Validators.required]
      )
    });
    this.formGroup.updateValueAndValidity();
  }

  /**
   * Angular lifecycle hook that is called after the component has been initialized.
   * It is used to perform any additional setup for the component.
   *
   * @memberof NewWorkdayModalComponent
   * @override
   * @lifecyclehook
   * @method ngOnInit
   */
  ngOnInit(): void { }

  /**
   * Closes the current dialog.
   *
   * @memberof NewWorkdayModalComponent
   */
  public closeThis = () => {
    this._matDialogRef.close()
  }

  /**
   * Creates a new workday by calling the createNewWorkday method of the WorkdaysService,
   * if the formGroup is valid.
   *
   * @memberof NewWorkdayModalComponent
   */
  public createWorkday = () => {
    //console.log(this.month.id, this.year)

    if (this.formGroup.valid) {
      const workday: WorkdayRequest = {
        EmployeeId: this.employee.ID,
        Month: this.month.id,
        Year: this.year,
        Deliveries: this.formGroup.controls['workdayDeliveries'].value
      }
      this._workdaysService.createNewWorkday(workday)
        .subscribe({
          next: (workday: Workday) => {
            //console.log(workday);
            this._matDialogRef.close();
        }
      })
    }
  }
}

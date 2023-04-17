/**
 * @file employee.component.ts
 * @brief Component for displaying and managing employee data in a modal dialog.
 */

import { Component, Inject, OnInit } from '@angular/core';
import { Employee, EmployeeRequest } from 'src/app/global/services/employees/employees.response';
import { EmployeesService } from 'src/app/global/services/employees/employees.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

/**
 * @class EmployeeModalComponent
 * @brief Represents the EmployeeModalComponent class, which is responsible for managing employee data in a modal dialog.
 */
@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
/**
 * @class EmployeeModalComponent
 * Represents the EmployeeModalComponent used for managing employees.
 */
export class EmployeeModalComponent implements OnInit {

  /**
   * @property {string[]} roles
   * Represents the roles available for selection.
   */
  private roles = [
    "chofer",
    "cargador",
    "auxiliar"
  ];

  /**
   * @property {number} index
   * Represents the index of the employee.
   */
  public index: number;

  /**
   * @property {EmployeeRequest | null} employee
   * Represents the employee object, which can be of type EmployeeRequest or null.
   */
  public employee?: EmployeeRequest | null;

  /**
   * @property {FormGroup} formGroup
   * Represents the form group used for managing employee data.
   */
  public formGroup: FormGroup;

  /**
   * @property {boolean} isNew
   * Represents a flag indicating whether the employee is new or not.
   */
  public isNew: boolean = true;

  /**
   * @brief Constructs a new instance of the EmployeeModalComponent class.
   * @param _employeesService The EmployeesService for making API calls related to employees.
   * @param data The data injected into the modal dialog, containing the employee data and index.
   * @param _matDialogRef The MatDialogRef for managing the modal dialog.
   */
  constructor(
    private _employeesService: EmployeesService,
    @Inject(MAT_DIALOG_DATA) data: { employee?: Employee | null, index: number },
    public _matDialogRef: MatDialogRef<EmployeeModalComponent>) {
    this.index = data.index;
    if (data.employee) {
      this.isNew = false;
      this.employee = {
        Name: data.employee!.Name,
        Surname: data.employee!.Surname,
        RoleId: data.employee!.RoleID,
        TaxId: data.employee!.TaxID,
        PaymentId: data.employee!.PaymentID
      };
      //console.log("Employee", this.employee);
    } else {
      this.employee = {
        Name: "",
        Surname: "",
        RoleId: 1,
        TaxId: 1,
        PaymentId: 2
      };
    }
    this.formGroup = new FormGroup({
      employeeName: new FormControl(
        this.employee?.Name ?? null,
        [Validators.required]
      ),
      employeeSurname: new FormControl(
        this.employee?.Surname ?? null,
        [Validators.required]
      ),
      employeeRole: new FormControl(
        this.employee?.RoleId ?? 1,
        [Validators.required]
      )
    });
    this.formGroup.updateValueAndValidity();
  }

  ngOnInit(): void {

  }

  /**
   * @brief Closes the modal dialog.
   */
  public closeThis = () => {
    this._matDialogRef.close();
  }

  /**
   * @brief Creates a new employee.
   */
  public createEmployee = () => {
    if (this.formGroup.valid) {
      //console.log(this.formGroup.controls['employeeRole'].value);
      this.employee = {
        Name: this.formGroup.controls['employeeName'].value,
        Surname: this.formGroup.controls['employeeSurname'].value,
        RoleId: this.formGroup.controls['employeeRole'].value,
        // RoleName: this.roles[this.formGroup.controls['employeeRole'].value + 1],
        TaxId: 1,
        PaymentId: 2
      };
      //console.log(this.employee);
      this._employeesService.createNewEmployee(this.employee)
        .subscribe({
          next: (employee: Employee) => {
            //console.log(employee)
            this._matDialogRef.close()
          }
        })
    }
  }

  /**
   * @brief Updates an existent employee
   */
  public updateEmployee = () => {
    if (this.formGroup.valid) {
      this._employeesService.updateEmployee(
        this.index,
        this.formGroup.controls['employeeRole'].value,
        this.formGroup.controls['employeeName'].value,
        this.formGroup.controls['employeeSurname'].value
        )
        .subscribe({
          next: (employee: Employee) => {
            //console.log(employee)
            this._matDialogRef.close()
        }
      })
    }
  }
}

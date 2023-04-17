
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employee } from 'src/app/global/services/employees/employees.response';
import { EmployeesService } from 'src/app/global/services/employees/employees.service';

/**
 * @class DeleteEmployeeModalComponent
 * Represents the DeleteEmployeeModalComponent which is used for deleting an employee.
 */
@Component({
  selector: 'app-modal-delete-employee',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteEmployeeModalComponent implements OnInit {

  /**
   * @property {Employee} employee
   * Represents the employee object to be deleted.
   */
  public employee: Employee;

  /**
   * @constructor
   * @param {_employeesService} _employeesService
   * Represents the EmployeesService used for deleting employees.
   * @param {MAT_DIALOG_DATA} data
   * Represents the data injected into the modal, containing the employee object.
   * @param {_matDialogRef} _matDialogRef
   * Represents the MatDialogRef used for controlling the modal.
   */
  constructor(
    private _employeesService: EmployeesService,
    @Inject(MAT_DIALOG_DATA) data: { employee: Employee },
    public _matDialogRef: MatDialogRef<DeleteEmployeeModalComponent>
  ) {
    // Initializes the component with the injected employee data
    this.employee = data.employee;
  }

  /**
   * @lifecyclehook
   * @method ngOnInit
   * Lifecycle hook that is called after the component has been initialized.
   */
  ngOnInit(): void {
    // Implement any additional initialization logic here
  }

  /**
   * @method closeThis
   * Closes the modal dialog.
   */
  public closeThis = () => {
    this._matDialogRef.close();
  }

  /**
   * @method deleteEmployee
   * Deletes the employee using the EmployeesService and closes the modal dialog.
   */
  public deleteEmployee = () => {
    this._employeesService.deleteEmployee(this.employee.ID).subscribe({
      next: (result) => {
        this._matDialogRef.close();
      }
    });
  }
}

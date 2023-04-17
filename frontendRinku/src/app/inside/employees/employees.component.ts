import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from './../../global/services/employees/employees.response'
import { EmployeesService } from 'src/app/global/services/employees/employees.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeModalComponent } from './modals/employee/employee.component';
import { WorkdayModalComponent } from './modals/workday/workday.component';
import { DeleteEmployeeModalComponent } from './modals/employee/delete/delete.component';

/**
 * @class EmployeesComponent
 * @description Component for managing employees.
 */
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  /**
   * @var employees Array<Employee>
   * @description Array to store the list of employees.
   */
  public employees: Array<Employee> = [];

  /**
   * @var dataSource MatTableDataSource<Employee>
   * @description Data source for the table to display employees.
   */
  public dataSource: MatTableDataSource<Employee> = new MatTableDataSource<Employee>([]);

  /**
   * @var nextPageLabel string
   * @description Label for the next page button in the paginator.
   */
  public nextPageLabel: string = 'Siguiente Página';

  /**
   * @var previousPageLabel string
   * @description Label for the previous page button in the paginator.
   */
  public previousPageLabel: string = 'Página anterior';

  /**
   * @var itemsPerPageLabel string
   * @description Label for the items per page select in the paginator.
   */
  public itemsPerPageLabel: string = 'Elementos por páginas';

  /**
   * @var loading boolean
   * @description Flag to indicate if data is still loading.
   */
  public loading: boolean = true;

  /**
   * @var filteredEmployees Array<Employee>
   * @description Array to store the filtered list of employees.
   */
  public filteredEmployees: Array<Employee> = [];

  /**
   * @var paginator MatPaginator | undefined
   * @description Reference to the MatPaginator component.
   */
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  /**
   * @var sort MatSort | undefined
   * @description Reference to the MatSort component.
   */
  @ViewChild(MatSort) sort?: MatSort;

  /**
   * @var newRoleId number
   * @description Number to store the new role ID for updating an employee.
   */
  public newRoleId: number = 0;

  /**
   * @var displayedColumns string[]
   * @description Array of strings to define the displayed columns in the table.
   */
  public displayedColumns: string[] = ['Numero de empleado', 'Nombre', 'Apellido','Rol', 'Acciones' ]

  /**
   * @constructor
   * @param _employeesService EmployeesService
   * @param _matDialog MatDialog
   * @description Constructor for EmployeesComponent.
   */
  constructor(private _employeesService: EmployeesService, private _matDialog: MatDialog) {
  }

  /**
   * @function ngOnInit
   * @description Lifecycle hook called after component initialization.
   */
  ngOnInit(): void {
    this.buildUsersTable()
  }

  /**
   * @function buildUsersTable
   * @description Builds the table to display employees.
   */
  public buildUsersTable = () => {
    this.dataSource.sortingDataAccessor = (item, property) => {
      if (property === 'username') {
        return item.Name;
      } else {
        return item.Name;
      }
    };
    this._employeesService.getAllEmployees().subscribe({
      next: (employees: Array<Employee>) => {
        this.employees = employees
        this.filteredEmployees = this.employees;
        this.refreshTable();
      },
    });
  };

/**
 * @function refreshTable
 * @description Refreshes the table data source with filtered employees and updates the table's paginator, sorter, and loading status.
 * @returns {void}
 */
public refreshTable = () => {
  this.dataSource = new MatTableDataSource<Employee>(this.filteredEmployees);

  // Set custom filter predicate for data source
  this.dataSource.filterPredicate = (
    data: Employee,
    filter: string
  ): boolean => {
    // Normalize data and filter strings for comparison
    const dataStr = Object.keys(data)
      .reduce((currentTerm: string, key: string) => {
        return currentTerm + (data as { [key: string]: any })[key] + '◬';
      }, '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
    const transformedFilter = filter
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

    // Return true if filter matches data, false otherwise
    return dataStr.indexOf(transformedFilter) != -1;
  };

  // Set paginator and sorter for data source
  this.dataSource.paginator = this.paginator ?? null;
  this.dataSource.sort = this.sort ?? null;

  // Set loading status to false
  this.loading = false;
};

/**
 * @function createNewEmployee
 * @description Opens a dialog to create a new employee and refreshes the table after the dialog is closed.
 * @returns {void}
 */
public createNewEmployee = () => {
  const indexes = this.dataSource.data.map((employee: Employee) => employee.ID);
  this._matDialog.open(EmployeeModalComponent, {
    data: { index: Math.max(...indexes) + 1 },
    disableClose: false,
    maxWidth: 1000,
  }).afterClosed().subscribe({
    next: () => {
      //console.log("closed");
      this.buildUsersTable();
    }
  });
};

/**
 * @function editEmployee
 * @description Opens a dialog to edit an employee and refreshes the table after the dialog is closed.
 * @param {Employee} employee - The employee to be edited
 * @returns {void}
 */
public editEmployee = (employee: Employee) => {
  //console.log(employee);
  this._matDialog.open(EmployeeModalComponent, {
    data: { employee: employee, index: employee.ID },
    disableClose: false,
    maxWidth: 1000,
  }).afterClosed().subscribe({
    next: () => {
      //console.log("closed");
      this.buildUsersTable();
    }
  });
};

/**
 * @function updateEmployee
 * @description Updates the employee data in the database and refreshes the table with updated data after the update is successful.
 * @param {Employee} employee - The employee to be updated
 * @param {number} newRoleId - The new role ID for the employee
 * @returns {void}
 */
public updateEmployee = (employee: Employee, newRoleId: number) => {
  //console.log(newRoleId);
  this._employeesService.updateEmployee(
    employee.ID,
    newRoleId,
    employee.Name,
    employee.Surname
  ).subscribe({
    next: (updatedEmployee: Employee) => {
      const index = this.employees.findIndex((e) => e.ID == updatedEmployee.ID);
      this.employees[index] = updatedEmployee;
      //console.log(updatedEmployee);
      this.buildUsersTable();
    }
  });
};

/**
 * @function deleteEmployee
 * @description Opens a dialog to confirm deleting an employee and refreshes the table after the dialog
*/
public deleteEmployee = (employee: Employee) => {
    this._matDialog.open(DeleteEmployeeModalComponent, {
        data: { employee: employee },
        disableClose: false,
        maxWidth: 1000,
     }).afterClosed().subscribe({
       next: () => {
         //console.log("closed")
         this.buildUsersTable()
       }
      })
    }

  /**
   * @function showWorkdays
   * @description Opens sdialog to show the workdays of an employee
  */
  public showWorkdays = (employee: Employee) => {
    this._matDialog.open(WorkdayModalComponent, {
      data: { employee },
      disableClose: false,
      maxWidth: 1200,
      maxHeight: 900
    })
  }
}

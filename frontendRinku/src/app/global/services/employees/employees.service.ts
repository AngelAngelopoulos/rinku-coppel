import { Injectable } from '@angular/core';
import { WebService } from '../web.service';
import { Observable } from 'rxjs';
import { Employee, EmployeeRequest } from './employees.response';


/**
 * Service to provide information to the models using WebService
 * @class
 */
@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  /**
   * Service constructor
   * @param _webService  WebService dependency injection
   * @constructor
   */
  constructor(private _webService: WebService) { }

  /**
   * Method to get all Employees information
   * @memberof EmployeesService
   * @returns response Employee with its information
   * @public
   */
  public getAllEmployees = (): Observable<Array<Employee>>  => {
    return this._webService.get('api/v1/employees', {});
  }

  /**
   * Method to get Employees by role
   * @memberof EmployeesService
   * @param role  Get the Employees with this roles
   * @returns response  Employees list with its information
   * @public
   */
  public getEmployeesWithRole = (role?: string): Observable<Array<Employee>> => {
    return this._webService.get(`api/v1/employees/${role}`, {});
  }

  /**
   * Method to create new employees
   * @memberof EmployeesService
   * @param employee  New Employee body to insert
   * @returns response  New Employee inserted
   * @public
   */
  public createNewEmployee = (employee: EmployeeRequest): Observable<Employee> => {
    return this._webService.post('api/v1/employees/create', employee);
  }

  /**
   * Method to update the inromation of an employee
   * @memberof EmployeesService
   * @param EmployeeId  Employee id to update
   * @param RoleId   Role id of employee to update
   * @param Name   Name of employee to update
   * @param Surname  Surname of employee to update
   * @returns { Observable<Employee> } response  Employee body updated
   * @public
   */
  public updateEmployee = (EmployeeId: number, RoleId: number, Name: string, Surname: string): Observable<Employee> => {
    return this._webService.put('api/v1/employees/update/role', { EmployeeId, RoleId, Name, Surname });
  }

  /**
   * Method to obtain one employee by its id
   * @memberof EmployeesService
   * @param EmployeeId  Id from employee to get its information
   * @returns response  Employee with its informtaion
   * @public
   */
  public getEmployee = (EmployeeId: number): Observable<Employee> => {
    return this._webService.get(`api/v1/employees/${EmployeeId}`, {})
  }

  /**
   * Method to delete an employee by its id
   * @memberof EmployeesService
   * @param EmployeeId  Id of employee to delete
   * @returns resposne  Boolean response with the sucess of the deletion
   * @public
   */
  public deleteEmployee = (EmployeeId: number): Observable<any> => {
    return this._webService.delete(`api/v1/employees/delete/${EmployeeId}`)
  }
}

import { Injectable } from '@angular/core';
import { WebService } from '../web.service';
import { Observable } from 'rxjs/internal/Observable';
import { Workday, WorkdayRequest } from './workdays.response';

/**
 * Service to provide information to the models using WebService
 * @class
 */
@Injectable({
  providedIn: 'root'
})
export class WorkdaysService {

  /**
   * Service constructor
   * @param _webService  WebService dependency injection
   * @constructor
   */
  constructor(private _webService: WebService) { }

  /**
   * Get all Workdays from an employee
   * @memberof WorkdaysService
   * @param employeeId  Id form employee to obtain its workdays
   * @returns response  All workdays from the Employee
   * @public
   */
  public getAllWorkdaysByEmployee = (employeeId: number): Observable<Array<Workday>> => {
    return this._webService.get(`api/v1/workdays/employee/${employeeId}`, {})
  }

  /**
   * Create a new workday
   * @memberof WorkdaysService
   * @param workday  Body of the request
   * @returns response  New workday created
   * @public
   */
  public createNewWorkday = (workday: WorkdayRequest): Observable<Workday> => {
    return this._webService.post('api/v1/workdays/create', workday)
  }
}

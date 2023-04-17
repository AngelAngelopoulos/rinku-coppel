/**
 * @fileoverview Workday Controller
 * @description Controller functions for handling HTTP requests related to workdays.
 * @module controllers/employeeController
 */

import { ResponseManager, Response, Request } from "../utils/responseManager";
import { Employee } from "../models/employee";
import { Workday } from "../models/workday";
import { SalaryCalculator } from "../utils/salaryCalculator";
import { workdayService } from "../services/workdayService";
import { employeeService } from "../services/employeeService";


/**
 * Get all workdays for a specific employee
 *
 * @function
 * @param {Request} request - The request object.
 * @param {Response} response - The response object.
 * @returns {Promise<void>} - A promise that resolves to the response object.
 */
const getAllWorkdaysByEmployee = (request: Request, response: Response) => {
    const { employeeId } = request.params;
    workdayService.getAllWorkdays(employeeId)
        .then((result: Array<Workday>) => {
            return ResponseManager.ok(response, result);
        })
        .catch((err: any) => {
            return ResponseManager.error(response, 500, err.message, err);
        })
}

/**
 * @brief Create a new workday for an employee.
 *
 * This function creates a new workday for an employee with the provided data in the request body.
 *
 * @param request - The HTTP request object.
 * @param response - The HTTP response object.
 */
const createNewWorkday = (request: Request, response: Response) => {
    const { EmployeeId, Month, Year, Deliveries } = request.body;
    employeeService.findEmployeeById(EmployeeId)
        .then((result: Array<Employee>) => {
            if (result.length == 0) return ResponseManager.error(
                response, 404,
                "Error creating the new workday. Employee does not exists",
                {});
            const employee = result[0]
            const monthBaseSalary = SalaryCalculator.calculateSalary(employee, Deliveries)
            const grossSalary = monthBaseSalary + SalaryCalculator.calculateBonusTotalPayment(employee) + SalaryCalculator.calculateDeliveriesTotalPayment(Deliveries)
            workdayService.createWorkday(
                EmployeeId,
                Month,
                Year,
                Deliveries,
                grossSalary,
                SalaryCalculator.calculateNetSalary(employee, grossSalary),
                SalaryCalculator.calculateTaxes(employee, grossSalary),
                SalaryCalculator.calculateFoodSupportPayment(employee, grossSalary),
                SalaryCalculator.calculateBonusTotalPayment(employee),
                SalaryCalculator.calculateDeliveriesTotalPayment(Deliveries))
                .then((result: Array<Workday>) => {
                    if (result.length == 0) return ResponseManager.error(response, 400, "Error creating new workday", {})
                    return ResponseManager.ok(response, result[0], true)
                })
        })
        .catch((err: any) => {
            return ResponseManager.error(response, 500, err.message, err);
        });
}

export const workdayController = {
    getAllWorkdaysByEmployee,
    createNewWorkday
}


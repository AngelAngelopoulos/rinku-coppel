/**
 * @fileoverview Employee Controller
 * @description Controller functions for handling HTTP requests related to employees.
 * @module controllers/employeeController
 */

import { ResponseManager, Response, Request } from "../utils/responseManager";
import { Employee } from "../models/employee";
import { employeeService } from "../services/employeeService";

/**
 * Get all employees
 *
 * @function
 * @param {Request} _ - The request object.
 * @param {Response} response - The response object.
 * @returns {Promise<void>} - A promise that resolves to the response object.
 */
const getAllEmployees = (_: Request, response: Response) => {
    employeeService.findAllEmployeesQuery()
        .then((result: Array<Employee>) => {
            return ResponseManager.ok(response, result);
        })
        .catch((err: any) => {
            return ResponseManager.error(response, 500, err.message, err);
        });
};

/**
 * Get an employee by ID
 *
 * @function
 * @param {Request} request - The request object.
 * @param {Response} response - The response object.
 * @returns {Promise<void>} - A promise that resolves to the response object.
 */
const getEmployeeById = (request: Request, response: Response) => {
    const { employeeId } = request.params
    employeeService.findEmployeeById(employeeId)
        .then((result: Array<Employee>) => {
            if (result.length == 0) return ResponseManager.error(response, 404, "Error: employee not found", {})
            return ResponseManager.ok(response, result[0], true);
        })
        .catch((err: any) => {
            return ResponseManager.error(response, 500, err.message, err);
        });
};

/**
 * Delete an employee by ID
 *
 * @function
 * @param {Request} request - The request object.
 * @param {Response} response - The response object.
 * @returns {Promise<void>} - A promise that resolves to the response object.
 */
const deleteEmployeeById = (request: Request, response: Response) => {
    const { employeeId } = request.params
    employeeService.deleteEmployee(Number.parseInt(employeeId))
        .then((result: Boolean) => {
            if (!result) return ResponseManager.error(response, 404, "Error: employee not found", {})
            return ResponseManager.ok(response, { success: result });
        })
        .catch((err: any) => {
            return ResponseManager.error(response, 500, err.message, err);
        });
};

/**
 * @brief Create a new employee.
 *
 * This function creates a new employee with the provided data in the request body.
 *
 * @param request - The HTTP request object.
 * @param response - The HTTP response object.
 */
const createNewEmployee = (request: Request, response: Response) => {
    const { Name, Surname, RoleId, PaymentId, TaxId } = request.body;
    employeeService.createNewEmployeeQuery(Name, Surname, PaymentId, RoleId, TaxId)
        .then((result: Array<Employee>) => {
            if (result.length == 0) return ResponseManager.error(response, 400, "Error creating employee", {})
            return ResponseManager.ok(response, result[0], true);
        })
        .catch((err: any) => {
            return ResponseManager.error(response, 500, err.message, err);
        });
}

/**
 * @brief Update the role of an employee.
 *
 * This function updates the role of an employee with the provided data in the request body.
 *
 * @param request - The HTTP request object.
 * @param response - The HTTP response object.
 */
const updateRoleEmployee = (request: Request, response: Response) => {
    const { EmployeeId, RoleId, Name, Surname } = request.body;
    employeeService.updateEmployee(Number(EmployeeId), Number(RoleId), Name, Surname)
        .then((result: Array<Employee>) => {
            if (result.length == 0) return ResponseManager.error(response, 404, "Error: employee not found", {})
            return ResponseManager.ok(response, result[0], true);
        })
        .catch((err: any) => {
            return ResponseManager.error(response, 500, err.message, err);
        });
}

export const employeeController = {
    getAllEmployees,
    createNewEmployee,
    updateRoleEmployee,
    getEmployeeById,
    deleteEmployeeById
};

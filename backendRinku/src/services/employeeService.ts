/**
 * @file employeeService.js
 * @description Contains methods for querying and manipulating employee data in the database.
 */

import Sequelize from "sequelize";
import { Employee } from "../models/employee";
import { sequelizeConnection } from "../config/db";

/**
 * @function findAllEmployeesQuery
 * @description Find all employees based on the given role.
 * @param {string|null} role - Role to filter employees by (optional).
 * @returns {Promise<Array<Employee>>} - Promise that resolves to an array of Employee objects.
 */
const findAllEmployeesQuery = ( role: string | null = null): Promise<Array<Employee>> => {
    return new Promise((resolve, reject) => {
        sequelizeConnection
            .query<Employee>("selectAllFromRole :role", {
                replacements: { role },
                type: Sequelize.QueryTypes.SELECT,
            })
            .then((result: Array<Employee>) => {
                resolve(result);
            })
            .catch((err: any) => {
                reject(err);
            });
    });
};

/**
 * @function findEmployeeById
 * @description Find an employee by ID.
 * @param {string} employeeId - ID of the employee.
 * @returns {Promise<Array<Employee>>} - Promise that resolves to an array of Employee objects.
 */
const findEmployeeById = (employeeId: string): Promise<Array<Employee>> => {
    return new Promise((resolve, reject) => {
        sequelizeConnection
            .query<Employee>("selectEmployee :employeeId", {
                replacements: { employeeId },
                type: Sequelize.QueryTypes.SELECT,
            })
            .then((result: Array<Employee>) => {
                resolve(result);
            })
            .catch((err: any) => {
                reject(err);
            });
    });
};

/**
 * @function createNewEmployeeQuery
 * @description Create a new employee in the database.
 * @param {string} name - Name of the employee.
 * @param {string} surname - Surname of the employee.
 * @param {number} roleId - Role ID of the employee.
 * @param {number} paymentId - Payment ID of the employee.
 * @param {number} taxId - Tax ID of the employee.
 * @returns {Promise<Array<Employee>>} - Promise that resolves to an array of Employee objects.
 */
const createNewEmployeeQuery = (name: string, surname: string, roleId: number, paymentId: number, taxId: number): Promise<Array<Employee>> => {
    return new Promise((resolve, reject) => {
        sequelizeConnection.query<Employee>("createNewEmployee :name, :surname, :paymentId, :roleId, :taxId", {
            replacements: { name, surname, paymentId, roleId, taxId },
            type: Sequelize.QueryTypes.SELECT
        })
            .then((result: Array<Employee>) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
        })
    })
}

/**
 * Update an employee in the database.
 *
 * @param {number} employeeId - The ID of the employee to update.
 * @param {number} roleId - The ID of the role to assign to the employee.
 * @param {string} name - The updated name of the employee.
 * @param {string} surname - The updated surname of the employee.
 * @returns {Promise<Array<Employee>>} - A promise that resolves to an array of updated Employee objects.
 */
const updateEmployee = (employeeId: number, roleId: number, name: string, surname: string ): Promise<Array<Employee>> => {
    return new Promise((resolve, reject) => {
        sequelizeConnection.query<Employee>("editEmployee :employeeId, :roleId, :name, :surname", {
            replacements: { employeeId, roleId, name, surname },
            type: Sequelize.QueryTypes.SELECT
        })
            .then((result: Array<Employee>) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

/**
 * Delete an employee from the database.
 *
 * @param {number} employeeId - The ID of the employee to delete.
 * @returns {Promise<Boolean>} - A promise that resolves to a boolean indicating whether the employee was successfully deleted (true) or not (false).
 */
const deleteEmployee = (employeeId: number): Promise<Boolean> => {
    return new Promise((resolve, reject) => {
        sequelizeConnection.query<Employee>("deleteEmployee :employeeId", {
                replacements: { employeeId },
                type: Sequelize.QueryTypes.SELECT,
            })
            .then((result: Array<Employee>) => {
                if (result.length < 1) resolve(true)
                else resolve(false);
            })
            .catch((err: any) => {
                reject(err);
            });
    })
}

export const employeeService = {
    findAllEmployeesQuery,
    findEmployeeById,
    createNewEmployeeQuery,
    updateEmployee,
    deleteEmployee
};

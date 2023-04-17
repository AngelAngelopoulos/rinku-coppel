/**
 * @file employeeRoutes.js
 * @description Defines routes related to employee management in the application.
 */

import express from 'express';
import { employeeController } from '../controllers/employeeController';

const app = express();

/**
 * @route GET /employees
 * @description Get all employees.
 * @access Public
 */
app.get('/employees', employeeController.getAllEmployees);

/**
 * @route POST /employees/create
 * @description Create a new employee.
 * @access Public
 */
app.post('/employees/create', employeeController.createNewEmployee);

/**
 * @route PUT /employees/update/role
 * @description Update the role of an employee.
 * @access Public
 */
app.put('/employees/update/role', employeeController.updateRoleEmployee);

/**
 * @route GET /employees/:employeeId
 * @description Get an employee by ID.
 * @access Public
 */
app.get('/employees/:employeeId', employeeController.getEmployeeById);

/**
 * @route DELETE /employees/delete/:employeeId
 * @description Delete an employee by ID.
 * @access Public
 */
app.delete('/employees/delete/:employeeId', employeeController.deleteEmployeeById);

export default app;

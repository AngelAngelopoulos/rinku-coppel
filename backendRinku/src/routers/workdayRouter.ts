/**
 * @file workdayRoutes.js
 * @description Defines routes related to workday management in the application.
 */

import express from 'express';
import { workdayController } from '../controllers/workdayController';

const app = express();

/**
 * @route POST /workdays/create
 * @description Create a new workday.
 * @access Public
 */
app.post('/workdays/create', workdayController.createNewWorkday);

/**
 * @route GET /workdays/employee/:employeeId
 * @description Get all workdays for an employee by ID.
 * @access Public
 */
app.get('/workdays/employee/:employeeId', workdayController.getAllWorkdaysByEmployee);

export default app;

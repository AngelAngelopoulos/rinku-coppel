import Sequelize from "sequelize"
import { Workday } from "../models/workday"
import { sequelizeConnection } from "../config/db"

/**
 * Create a new workday for an employee in the database.
 *
 * @param {number} employeeId - The ID of the employee for whom to create the workday.
 * @param {number} month - The month of the workday.
 * @param {number} year - The year of the workday.
 * @param {number} deliveries - The number of deliveries for the workday.
 * @param {number} grossSalary - The gross salary for the workday.
 * @param {number} netSalary - The net salary for the workday.
 * @param {number} taxes - The taxes for the workday.
 * @param {number} foodSupportPayment - The food support payment for the workday.
 * @param {number} bonusTotalPayment - The total bonus payment for the workday.
 * @param {number} deliveriesTotalPayment - The total payment for deliveries for the workday.
 * @returns {Promise<Array<Workday>>} - A promise that resolves to an array of created Workday objects.
 */
const createWorkday = (employeeId: number, month: number, year: number, deliveries: number, grossSalary: number, netSalary: number, taxes: number, foodSupportPayment: number, bonusTotalPayment: number, deliveriesTotalPayment: number): Promise<Array<Workday>> => {
    return new Promise((resolve, reject) => {
        sequelizeConnection
            .query<Workday>("createNewWorkday :employeeId, :month, :year, :deliveries, :grossSalary, :netSalary, :taxes, :foodSupportPayment, :bonusTotalPayment, :deliveriesTotalPayment", {
                replacements: { employeeId, month, year, deliveries, grossSalary, netSalary, taxes, foodSupportPayment, bonusTotalPayment, deliveriesTotalPayment },
                type: Sequelize.QueryTypes.SELECT
            })
            .then((result: Array<Workday>) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

/**
 * Get all workdays for an employee from the database.
 *
 * @param {string} employeeId - The ID of the employee for whom to retrieve workdays.
 * @returns {Promise<Array<Workday>>} - A promise that resolves to an array of retrieved Workday objects.
 */
const getAllWorkdays = (employeeId: string): Promise<Array<Workday>> => {
    return new Promise((resolve, reject) => {
        sequelizeConnection
            .query<Workday>("selectAllWorkdaysFromEmployee :employeeId", {
                replacements: { employeeId },
                type: Sequelize.QueryTypes.SELECT,
            })
            .then((result: Array<Workday>) => {
                resolve(result);
            })
            .catch((err: any) => {
                reject(err);
            });
    });
}

export const workdayService = {
    createWorkday,
    getAllWorkdays
}

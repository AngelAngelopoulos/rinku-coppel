import { Employee } from "../models/employee";

/**
 * SalaryCalculator class for calculating salary-related values.
 */
export class SalaryCalculator {
  /**
   * Calculate the monthly base salary for the given employee.
   *
   * @param {Employee} employee - Employee object.
   * @param {number} deliveries - Number of deliveries made by the employee.
   * @returns {number} - Monthly base salary.
   */
  static calculateSalary = (employee: Employee, deliveries: number): number => {
    const totalHours = SalaryCalculator.calculateHours(employee)
    const monthBaseSalary = totalHours * employee.BasicSalary
    return monthBaseSalary;
  }

  /**
   * Calculate the net salary for the given employee with the given gross salary.
   *
   * @param {Employee} employee - Employee object.
   * @param {number} grossSalary - Gross salary.
   * @returns {number} - Net salary.
   */
  static calculateNetSalary = (employee: Employee, grossSalary: number): number => {
    const taxPerTotal = (grossSalary > employee.LimitSalary ? employee.TaxesPercentage + employee.Extra : employee.TaxesPercentage) / 100
    return grossSalary * (1 - (taxPerTotal))
  }

  /**
   * Calculate the total number of work hours for the given employee.
   *
   * @param {Employee} employee - Employee object.
   * @returns {number} - Total number of work hours.
   */
  static calculateHours = (employee: Employee): number => {
    return employee.WorkHours * employee.WorkDays
  }

  /**
   * Calculate the total bonus payment for the given employee.
   *
   * @param {Employee} employee - Employee object.
   * @returns {number} - Total bonus payment.
   */
  static calculateBonusTotalPayment = (employee: Employee): number => {
    return SalaryCalculator.calculateHours(employee) * employee.Bonus;
  }

  /**
   * Calculate the total payment for deliveries made by the employee.
   *
   * @param {number} deliveries - Number of deliveries made.
   * @returns {number} - Total payment for deliveries.
   */
  static calculateDeliveriesTotalPayment = (deliveries: number): number => deliveries * 5.00

  /**
   * Calculate the total taxes for the given employee with the given gross salary.
   *
   * @param {Employee} employee - Employee object.
   * @param {number} grossSalary - Gross salary.
   * @returns {number} - Total taxes.
   */
  static calculateTaxes = (employee: Employee, grossSalary: number): number => {
    const taxPerTotal = (grossSalary > employee.LimitSalary ? employee.TaxesPercentage + employee.Extra : employee.TaxesPercentage) / 100
    return grossSalary * taxPerTotal
  }

  /**
   * Calculate the food support payment for the given employee with the given gross salary.
   *
   * @param {Employee} employee - Employee object.
   * @param {number} grossSalary - Gross salary.
   * @returns {number} - Food support payment.
   */
  static calculateFoodSupportPayment = (employee: Employee, grossSalary: number): number => {
    return grossSalary * (employee.FoodSupportPercentage / 100)
  }
}

/**
 * @interface Employee
 * @description Represents an employee object with various properties.
 * @property {number} ID - The ID of the employee.
 * @property {string} Name - The name of the employee.
 * @property {string} Surname - The surname of the employee.
 * @property {number} RoleID - The ID of the role of the employee.
 * @property {number} TaxID - The ID of the tax of the employee.
 * @property {number} PaymentID - The ID of the payment of the employee.
 * @property {string} RoleName - The name of the role of the employee.
 * @property {number} BasicSalary - The basic salary of the employee.
 * @property {number} Bonus - The bonus amount of the employee.
 * @property {number} ExtraPayment - The extra payment of the employee.
 * @property {number} FoodSupportPercentage - The food support percentage of the employee.
 * @property {number} WorkHours - The total work hours of the employee.
 * @property {number} WorkDays - The total work days of the employee.
 * @property {number} LimitSalary - The limit salary of the employee.
 * @property {number} TaxesPercentage - The taxes percentage of the employee.
 * @property {number} Extra - The extra amount of the employee.
 */

export interface Employee {
  ID: number;
  Name: string;
  Surname: string;
  RoleID: number;
  TaxID: number;
  PaymentID: number;
  RoleName: string;
  BasicSalary: number;
  Bonus: number;
  ExtraPaymeent: number;
  FoodSupportPercentage: number;
  WorkHours: number;
  WorkDays: number;
  LimitSalary: number;
  TaxesPercentage: number;
  Extra: number
}

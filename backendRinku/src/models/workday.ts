/**
 * @interface Workday
 * @description Represents a workday object with various properties.
 * @property {number} ID - The ID of the workday.
 * @property {number} EmployeeID - The ID of the employee associated with the workday.
 * @property {number} Month - The month of the workday.
 * @property {number} Year - The year of the workday.
 * @property {number} Deliveries - The number of deliveries for the workday.
 * @property {number} GrossSalary - The gross salary for the workday.
 * @property {number} NetSalary - The net salary for the workday.
 * @property {number} Taxes - The taxes amount for the workday.
 * @property {number} FoodSupportPayment - The food support payment for the workday.
 * @property {number} BonusTotalPayment - The total bonus payment for the workday.
 * @property {number} DeliveriesTotalPayment - The total payment for deliveries for the workday.
 */

export interface Workday {
    ID: number;
    EmployeeID: number;
    Month: number;
    Year: number;
    Deliveries: number;
    GrossSalary: number;
    NetSalary: number;
    Taxes: number;
    FoodSupportPayment: number;
    BonusTotalPayment: number;
    DeliveriesTotalPayment: number;
}

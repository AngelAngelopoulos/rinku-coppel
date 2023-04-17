/**
 * @interface Workday
 * @description Interface defining the properties of a workday object
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

/**
 * @interface WorkdayRequest
 * @description Interface defining the properties of a workday request object
 */
export interface WorkdayRequest {
  EmployeeId: number;
  Month: number;
  Year: number;
  Deliveries: number;
}

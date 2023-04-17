
/**
 * Employee general structure
 * @interface Employee
 * @description Interface defining the properties of an employee object
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

/**
 * @interface EmployeeRequest
 * @description Interface defining the properties of an employee request object
 */
export interface EmployeeRequest {
    Name: string
    Surname: string
    RoleId: number
    PaymentId: number
    TaxId: number
}

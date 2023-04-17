/**
 * @interface Payment
 * @description Interface defining the properties of a payment object
 */
export interface Payment {
  ID: number;
  BasicSalary: number;
  WorkHours: number;
  WorkDays: number;
  ExtraPayment: number;
  Bonus: number;
  FoodSupportPercentage: number;
}

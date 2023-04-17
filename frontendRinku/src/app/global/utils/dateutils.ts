
/**
 * @interface Month
 * @description Interface defining the properties of a month object
 */
export interface Month {
  id: number,
  name: string
}

/**
 * @class DateUtils
 * @description Utility class for handling date-related operations
 */
export class DateUtils {
  /**
   * @property {Array<Month>} Months
   * @static
   * @description Array of month objects with their corresponding ID and name
   */
  static Months = [
    { id: 1, name: 'Enero' },
    { id: 2, name: 'Febrero' },
    { id: 3, name: 'Marzo' },
    { id: 4, name: 'Abril' },
    { id: 5, name: 'Mayo' },
    { id: 6, name: 'Junio' },
    { id: 7, name: 'Julio' },
    { id: 8, name: 'Agosto' },
    { id: 9, name: 'Septiembre' },
    { id: 10, name: 'Octubre' },
    { id: 11, name: 'Noviembre' },
    { id: 12, name: 'Diciembre' }
  ]
}

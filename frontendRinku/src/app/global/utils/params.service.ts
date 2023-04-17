import { Injectable } from '@angular/core';

/**
 * Service to build params in a decodable URL format
 * @class ParamsService
 */
@Injectable({
  providedIn: 'root'
})
export class ParamsService {

  /**
   * Method to build URL params
   * @param params  Object with Params in a Object shape
   * @returns strings
   */
  public static buildURLParams(params?: Object): string {
    let strings: string[] = [];

    if (params) {
      Object.keys(params).forEach((key: string) => {
        const param = (params as any)[key]
        if (param != null && param != undefined) {
          strings.push(`${key}=${param}`)
        }
      })
    }

    return strings.length > 0 ? "?" + strings.join('&') : "";
  }
}

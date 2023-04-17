import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParamsService } from '../utils/params.service';
import { environment } from 'src/environments/environment';

/**
 * Web service to make HTTP requests
 * @class
 */
@Injectable({
  providedIn: 'root'
})
export class WebService {
  /**
   * API URL string
   * @private
   */
  private apiUrl = environment.apiURL;

  /**
   * Contructor of WebDervice
   * @param http  Http Injection library
   * @constructor
   */
  constructor(private http: HttpClient) { }

  /**
   * Method to build HTTP headers
   * @returns headers  A HttpHeaders object with the token injected
   */
  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json'
    });
    return headers;
  }

  /**
   * Method to make a GET Http request
   * @param url  Object with endpoint URL
   * @param params  Object with query params
   * @returns response Generic Http Response
   */
  get<T>(url: string, params?: Object): Observable<T> {
    const headers = this.getHeaders();
    return this.http.get<T>(`${this.apiUrl}/${url}${ParamsService.buildURLParams(params)}`, { headers });
  }

  /**
   * Method to make a POST Http request
   * @param url  Object with endpoint URL
   * @param data  Object with body data
   * @returns response Generic Http Response
   */
  post<T>(url: string, data: any): Observable<T> {
    const headers = this.getHeaders();
    return this.http.post<T>(`${this.apiUrl}/${url}`, data, { headers });
  }

  /**
   * Method to make a PUT Http request
   * @param url  Object with endpoint URL
   * @param data  Object with body data
   * @returns response Generic Http Response
   */
  put<T>(url: string, data: any): Observable<T> {
    const headers = this.getHeaders();
    return this.http.put<T>(`${this.apiUrl}/${url}`, data, { headers });
  }

  /**
   * Method to maake a DELETE Http request
   * @param url  Object with endpoint URL
   * @returns  response Generic Http Response
   */
  delete<T>(url: string): Observable<T> {
    const headers = this.getHeaders();
    return this.http.delete<T>(`${this.apiUrl}/${url}`, { headers });
  }

}

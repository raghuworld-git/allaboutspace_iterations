// import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { catchError, map, Observable, throwError } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export abstract class RestGenericService<T> {

//   // https://dev.to/this-is-angular/generic-approach-to-consume-rest-api-in-angular-4poj

//   private readonly APIUrl: string = "";

//   constructor(protected httpClient: HttpClient, protected baseURL: string) {
//     this.APIUrl = this.baseURL + this.getResourceUrl();
//   }

//   abstract getResourceUrl(): string;

//   toServerModel(entity: T): any {
//     return entity;
//   }

//   fromServerModel(json: any): T {
//     return json;
//   }

//   getList(index: number, page: number): Observable<T[]> {
//     let params = new HttpParams()
//       .set('limit', index.toString())
//       .set('offset', page.toString());

//     return this.httpClient.get<T[]>(`/${this.APIUrl}?${params.toString()}`)
//       .pipe(
//         map((list) => list.map((item) => this.fromServerModel(item))),
//         catchError(this.handleError)
//       );
//   }

//   get(id: string | number): Observable<T> {
//     return this.httpClient.get<T>(`/${this.APIUrl}/${id}`)
//       .pipe(
//         map((json) => this.fromServerModel(json)),
//         catchError(this.handleError)
//       );
//   }

//   private handleError(error: HttpErrorResponse) {
//     // Handle the HTTP error here
//     return throwError(() => error);
//   }

// }

import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  HttpAddOptions,
  HttpConfig,
  HttpDeleteOptions,
  HttpGetListOptions,
  HttpGetSingleOptions,
  HttpMethod,
  HttpUpdateOptions,
} from './generic-rest.types';
import {
  extractRequestOptions,
  mapResponse,
  resolveUrl,
} from './generic-rest.utils';

export class RestGenericService {
  private readonly http: HttpClient;

  constructor(protected httpConfig: HttpConfig) {
    this.http = inject(HttpClient);
  }

   url(): string {
    const { baseUrl, resourceName } = this.httpConfig;
    return `${baseUrl}/${resourceName}`;
  }

  /**
   * Exposes HTTP client service to allow custom HTTP requests
   * @returns HTTP client service
   */
  getHttpClient(): HttpClient {
    return this.http;
  }

  /**
   * Performs a GET HTTP request
   * @param options custom specific HTTP options for GET list requests
   * @returns generic type | list of objects
   */
  list<T>(options?: HttpGetListOptions): Observable<T> {
    const method: HttpMethod = 'GET';
    const url = resolveUrl(this.url(), options);
    const requestOptions = extractRequestOptions(options);

    return this.http
      .request<T>(method, url, requestOptions)
      .pipe(mapResponse(options), catchError(this.handleError));
  }

  /**
   * Performs a GET HTTP request
   * @param options custom specific HTTP options for GET single requests
   * @returns generic type | single object
   */
  single<T>(
    id: string | number,
    options?: HttpGetSingleOptions
  ): Observable<T> {
    const method: HttpMethod = 'GET';
    const url = resolveUrl(this.url(), options, id.toString());
    const requestOptions = extractRequestOptions(options);

    return this.http
      .request<T>(method, url, requestOptions)
      .pipe(mapResponse(options), catchError(this.handleError));
  }

  /**
   * Performs a POST HTTP request (flexible for bulk inserting)
   * @param options custom specific HTTP options for Add requests
   * @returns generic type | single object or list of objects
   */
  add<T>(body: T, options?: HttpAddOptions): Observable<T> {
    const method: HttpMethod = 'POST';
    const url = resolveUrl(this.url(), options);
    const requestOptions = { ...extractRequestOptions(options), body };

    return this.http
      .request<T>(method, url, requestOptions)
      .pipe(mapResponse(options), catchError(this.handleError));
  }

  /**
   * Performs a PUT | PATCH HTTP request (flexible for bulk updating)
   * @param options custom specific HTTP options for Update requests
   * @returns generic type | single object or list of objects
   */
  update<T>(
    id: string | number,
    body: T,
    options?: HttpUpdateOptions
  ): Observable<T> {
    const method: HttpMethod = options?.method || 'PUT';
    const url = resolveUrl(this.url(), options, id.toString());
    const requestOptions = { ...extractRequestOptions(options), body };

    return this.http
      .request<T>(method, url, requestOptions)
      .pipe(mapResponse(options), catchError(this.handleError));
  }

  /**
   * Performs a DELETE HTTP request (flexible for bulk deleting)
   * @param options custom specific HTTP options for Delete requests
   * @returns generic type | single object or list of objects
   */
  delete<T>(id: string | number, options?: HttpDeleteOptions): Observable<T> {
    const method: HttpMethod = 'DELETE';
    const url = resolveUrl(this.url(), options, id.toString());
    const requestOptions = extractRequestOptions(options);

    return this.http
      .request<T>(method, url, requestOptions)
      .pipe(mapResponse(options), catchError(this.handleError));
  }

  protected handleError(error: any): Observable<never> {
    return throwError(error.message || error);
  }
}
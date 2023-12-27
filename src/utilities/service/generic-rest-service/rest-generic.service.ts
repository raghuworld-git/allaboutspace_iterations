import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RestGenericService {

    constructor(private httpClient: HttpClient) {
    }

    getList<T>(url: string, params?: HttpParams): Observable<T> {                
        return this.httpClient.get<T>(`${url}?${params?.toString()}`)
            .pipe(
                catchError(this.handleError)
            );
    }

    get<T>(url: string, id: string | number): Observable<T> {            
        return this.httpClient.get<T>(`${url}/${id.toString()}`)
            .pipe(
                catchError(this.handleError)
            );
    }

    add<T>(url: string, resource: T): Observable<any> {
        return this.httpClient.post(`${url}`, resource)
            .pipe(
                catchError(this.handleError)
            );
    }

    delete(url: string, id: string | number): Observable<any> {
        return this.httpClient.delete(`${url}/${id}`)
            .pipe(
                catchError(this.handleError)
            );
    }

    update<T>(url: string, resource: T) {
        return this.httpClient.put(`${url}`, resource)
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
        // Handle the HTTP error here
        return throwError(() => error);
    }
}


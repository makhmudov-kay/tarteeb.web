import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiBroker<T> {
  protected baseUrl = environment.apiUrl;

  constructor(protected http: HttpClient) {}

  public post(endpoint: string, item: T): Observable<T> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', // You can change this to other content types as needed
      }),
    };

    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, item, httpOptions);
  }

  public put(endpoint: string, item: T): Observable<T> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', // You can change this to other content types as needed
      }),
    };

    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, item, httpOptions);
  }

  public getById(id: string, endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}/${id}`);
  }

  public get(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`);
  }

  public getAll(endpoint: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}/${endpoint}`);
  }

  public delete<T>(endpoint: string, body: T): Observable<T> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', // You can change this to other content types as needed
      }),
    };

    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, {
      headers: httpOptions.headers,
      body: body,
    });
  }

  public deleteById<T>(endpoint: string, id: string): Observable<T> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', // You can change this to other content types as needed
      }),
    };

    return this.http.delete<T>(`${this.baseUrl}/${endpoint}?${id}`, {
      headers: httpOptions.headers,
    });
  }
}

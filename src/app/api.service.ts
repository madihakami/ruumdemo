import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "./user/user";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private SERVER_URL = "/api/users";
  constructor(private httpClient: HttpClient) { }

  public get(){
    return this.httpClient.get(this.SERVER_URL);
  }

  public getUsers(): Observable<User> {
    return this.httpClient.get<User>(this.SERVER_URL)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

// Error handling
  handleError(error : any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  public dtmiRegEx: RegExp = new RegExp("^dtmi:(?:_+[A-Za-z0-9]|[A-Za-z])(?:[A-Za-z0-9_]*[A-Za-z0-9])?(?::(?:_+[A-Za-z0-9]|[A-Za-z])(?:[A-Za-z0-9_]*[A-Za-z0-9])?)*;[1-9][0-9]{0,8}$");

  private _http: HttpClient;

  constructor(http: HttpClient) {
    this._http = http;
   }

  public validDtmi(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid = this.dtmiRegEx.test(control.value);
      return isValid ? null : { forbiddenName: { value: control.value } };
    };
  }

  public validateModel(model: any[]): Observable<any> {
    let url = `${environment.apiUrl}/dtdl/validate`
    return this._http.post(url, model)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {      
      console.error("An error occurred:", error.error);
    } else {      
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }

    return throwError(() => new Error("Something bad happened; please try again later."));
  }
}

import { HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs"

export class BaseService {

    handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            //if I had logger service at the end I would like to return this error to log it.
            console.error(error);

            return of(result as T);
        };
    }


}

export const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
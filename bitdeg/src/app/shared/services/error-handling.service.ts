import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { MessageService } from "./message.service";

export type ErrorHandler = <T>(
  operation?: string,
  result?: T,
  customMsg?: string,
) => (error: HttpErrorResponse) => Observable<T>;

@Injectable({
  providedIn: "root",
})
export class ErrorHandlerService {
  constructor(private message: MessageService) {}

  errMsgs = new BehaviorSubject<Array<{ desc: string }>>([]);

  createErrorHandler = (serviceName = "") => {
    return <T>(operation = "Operation", result = {} as T, customMsg: string) =>
      this.handleError(serviceName, operation, result, customMsg);
  };

  handleError<T>(
    serviceName = "",
    operation = "",
    result = {} as T,
    customMsg: string,
  ) {
    return (error: HttpErrorResponse): Observable<T> => {
      if (error.status === 422) {
        //unprocessible entity / form errors
        const fieldError = error.error[`errors`];
        const errMsgs = [];
        if (fieldError instanceof Object) {
          for (const field in fieldError) {
            errMsgs.push({ desc: fieldError[field][0] });
          }
        } else {
          errMsgs.push({ desc: fieldError });
        }
        /**Form components should listen to errMsgs observable to display errors from their form */

        this.errMsgs.next(errMsgs);
      } else if (error.status === 405) {
        //method not allowed (e.g useful for automatic form save ie. error would trigger update instead of create)
        return throwError(error.error);
      } else {
        const message =
          error.error instanceof ErrorEvent
            ? error.error.message
            : customMsg
            ? customMsg
            : `${serviceName} ${operation} failed: Unable to reach server`;

        this.message.show({ type: "error", message: message });
      }
      return of(result);
    };
  }
}

import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { MessageService } from "./message.service";

export type ErrorHandler = <T>(
  operation?: string,
  result?: T,
  customMsg?: string
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
    customMsg: string
  ) {
    return (error: HttpErrorResponse): Observable<T> => {
      if (error.status === 422) {
        const fieldError = error.error[`errors`];
        const errMsgs = [];
        if (fieldError instanceof Object) {
          for (const field in fieldError) {
            errMsgs.push({ desc: fieldError[field][0] });
          }
        } else {
          errMsgs.push({ desc: fieldError });
        }
        this.errMsgs.next(errMsgs);
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

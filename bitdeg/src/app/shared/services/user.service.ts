import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PageSearch, User } from "@core/models";
import { env } from "@env/environment";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { ErrorHandler, ErrorHandlerService } from "./error-handling.service";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private baseUrl = `${env.BASE_API}/users`;
  private handleError: ErrorHandler;
  constructor(private http: HttpClient, errorHandler: ErrorHandlerService) {
    this.handleError = errorHandler.createErrorHandler();
  }

  findAll(pageParams: PageSearch<User>): Observable<User> {
    const params = new HttpParams().append("userId", pageParams.data.id);
    return this.http
      .get<User>(`${this.baseUrl}`)
      .pipe(catchError(this.handleError(`Find photo`, {} as User)));
  }
}

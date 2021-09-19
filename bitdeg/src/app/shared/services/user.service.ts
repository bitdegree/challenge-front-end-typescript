import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PageSearch, User } from "@core/models";
import { env } from "@env/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { ErrorHandler, ErrorHandlerService } from "./error-handling.service";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private baseUrl = `${env.BASE_API}/users`;
  private handleError: ErrorHandler;
  public users: BehaviorSubject<User[]> = new BehaviorSubject(null);
  constructor(private http: HttpClient, errorHandler: ErrorHandlerService) {
    this.handleError = errorHandler.createErrorHandler();
  }

  findAll(pageParams: PageSearch<User>): Observable<Array<User>> {
    const params = pageParams.data.id
      ? new HttpParams().append("id", pageParams.data.id)
      : null;
    return this.http
      .get<Array<User>>(`${this.baseUrl}`, { params })
      .pipe(catchError(this.handleError(`Find Users`, [])));
  }

  find(id: number): Observable<User> {
    return this.http
      .get<User>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError(`Read User`, {} as User)));
  }
}

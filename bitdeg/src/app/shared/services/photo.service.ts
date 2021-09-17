import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Photo } from "@core/models";
import { env } from "@env/environment";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { ErrorHandler, ErrorHandlerService } from "./error-handling.service";

@Injectable({
  providedIn: "root",
})
export class PhotoService {
  private baseUrl = `${env.BASE_API}/photos`;
  private handleError: ErrorHandler;
  constructor(private http: HttpClient, errorHandler: ErrorHandlerService) {
    this.handleError = errorHandler.createErrorHandler();
  }

  findAll() {
    //
  }

  find(id: number = 1): Observable<Photo> {
    return this.http
      .get<Photo>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError(`Find photo`, {} as Photo)));
  }
}

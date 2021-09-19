import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PageSearch, Post } from "@core/models";
import { env } from "@env/environment";
import {
  ErrorHandler,
  ErrorHandlerService,
} from "@shared/services/error-handling.service";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class PostService {
  private baseUrl = `${env.BASE_API}/posts`;
  private handleError: ErrorHandler;
  constructor(private http: HttpClient, errorHandler: ErrorHandlerService) {
    this.handleError = errorHandler.createErrorHandler();
  }

  findAll(pageParams: PageSearch<Post>): Observable<Array<Post>> {
    const params = pageParams.data.id
      ? new HttpParams().append("userId", pageParams.data.filters.userId)
      : null;
    return this.http
      .get<Array<Post>>(`${this.baseUrl}`, { params })
      .pipe(catchError(this.handleError(`Find Posts`, [])));
  }

  find(id: number): Observable<Post> {
    return this.http
      .get<Post>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError(`Read Post`, {} as Post)));
  }

  create(data: Post): Observable<Post> {
    return this.http
      .post<{ data: Post; id: number }>(`${this.baseUrl}`, { data })
      .pipe(
        map((resp) => resp[`data`] as Post),
        catchError(this.handleError(`Create Post`, {} as Post)),
      );
  }

  update(data: Post): Observable<Post> {
    return this.http
      .put<{ data: Post; id: number }>(`${this.baseUrl}/${data.userId}`, {
        data,
      }) //using userId  to prevent undefined as post is not saved actually by api
      .pipe(
        map((resp) => resp[`data`] as Post),
        catchError(this.handleError(`Update Post`, {} as Post)),
      );
  }
}

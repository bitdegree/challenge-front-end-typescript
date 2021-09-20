import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { LoaderService } from "@shared/services/loader.service";
import { tap } from "rxjs/operators";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loader: LoaderService) {}

  /**Toggle loader state on start and completion of request */
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    this.loader.setLoading(true, request.url);
    return next.handle(request).pipe(
      tap({
        error: () => this.loader.setLoading(false, request.url),
        complete: () => this.loader.setLoading(false, request.url),
      }),
    );
  }
}

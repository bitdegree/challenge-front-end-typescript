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

  //urls to ignore
  whiteList: string[] = [""];

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    for (let i = 0; i < this.whiteList.length; i++) {
      if (request.url.indexOf(this.whiteList[i]) > -1) {
        return next.handle(request);
      }
    }
    this.loader.setLoading(true, request.url);
    return next.handle(request).pipe(
      tap({
        error: () => this.loader.setLoading(false, request.url),
        complete: () => this.loader.setLoading(false, request.url),
      }),
    );
  }
}

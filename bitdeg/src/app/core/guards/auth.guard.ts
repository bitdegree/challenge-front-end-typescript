import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import {
  CanActivate,
  CanActivateChild,
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { AUTH_CONST } from "@core/utils/app.const";
import { AuthService } from "@shared/services/auth.service";
import { LocalStorageService } from "@shared/services/local-storage.service";
import { SigninComponent } from "app/auth/signin/signin.component";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private storage: LocalStorageService,
    private dialog: MatDialog,
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkLogin(state.url);
  }

  /**If user payload does not exist in local storage, prompt for signin and set redirect to true to enable redirect to guarded route */
  checkLogin = (url: string): boolean => {
    if (!this.storage.exists(AUTH_CONST.USER_KEY)) {
      this.dialog.open(SigninComponent, {
        minWidth: "30vw",
        data: {
          redirect: true,
          url: url,
        },
      });
      return false;
    }
    return true;
  };
}

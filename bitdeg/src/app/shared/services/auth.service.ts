import { Injectable } from "@angular/core";
import { User } from "@core/models";
import { AUTH_CONST } from "@core/utils/app.const";
import { BehaviorSubject, Observable, of } from "rxjs";
import { LocalStorageService } from "./local-storage.service";
import { MessageService } from "./message.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public activeUser: BehaviorSubject<User> = new BehaviorSubject(null);
  constructor(
    private storage: LocalStorageService,
    private msg: MessageService,
  ) {}

  /**Persist supplied user to mimic authenticated state */
  signIn = (user: User): Observable<string> => {
    this.storage.save<User>(AUTH_CONST.USER_KEY, user);
    this.activeUser.next(user);
    this.msg.show({
      type: "success",
      message: "You are signed in successfully",
    });
    return of("Success");
  };

  signOut = (): Observable<string> => {
    this.storage.remove(AUTH_CONST.USER_KEY);
    this.activeUser.next(null);
    this.msg.show({ type: "success", message: "You are now signed out" });
    return of("Success");
  };
}

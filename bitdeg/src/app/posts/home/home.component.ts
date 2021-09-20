import { Component, OnInit } from "@angular/core";
import { User } from "@core/models";
import { AUTH_CONST } from "@core/utils/app.const";
import { UntilDestroy } from "@ngneat/until-destroy";
import { AuthService } from "@shared/services/auth.service";
import { LocalStorageService } from "@shared/services/local-storage.service";

/**Until destroy decorator automatically unsubscribes from all subscriptions on destroy of component */
@UntilDestroy({ checkProperties: true })
@Component({
  selector: "bitdeg-home",
  templateUrl: "./home.component.html",
  styleUrls: [],
})
export class HomeComponent implements OnInit {
  constructor(
    private storage: LocalStorageService,
    private auth: AuthService,
  ) {}
  ngOnInit(): void {
    /**Get existing user from local storage */
    const user = this.auth.activeUser.value;
    if (!user) {
      const activeUser = this.storage.get<User>(AUTH_CONST.USER_KEY);
      this.auth.activeUser.next(activeUser);
    }
  }
}

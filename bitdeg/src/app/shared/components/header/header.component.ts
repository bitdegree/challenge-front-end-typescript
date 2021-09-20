import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { User } from "@core/models";
import { THEME } from "@core/utils/app.const";
import { UntilDestroy } from "@ngneat/until-destroy";
import { AuthService } from "@shared/services/auth.service";
import { LocalStorageService } from "@shared/services/local-storage.service";
import { SigninComponent } from "app/auth/signin/signin.component";
import { Observable } from "rxjs";

@UntilDestroy({ checkProperties: true })
@Component({
  selector: "bitdeg-header",
  templateUrl: "./header.component.html",
  styleUrls: [],
})
export class HeaderComponent implements OnInit {
  user$: Observable<User>;
  darkMode: boolean;
  constructor(
    private auth: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private storage: LocalStorageService,
  ) {}

  ngOnInit(): void {
    this.user$ = this.auth.activeUser;
    this.currentTheme();
  }

  /**If theme not set before set and persist theme  */
  currentTheme = (): void => {
    if (!this.storage.exists(THEME.current)) {
      this.storage.save(THEME.current, THEME.dark);
    }
    this.isDarkMode();
  };

  switchTheme = (): void => {
    let newTheme = THEME.dark;
    const currentTheme = this.storage.get<string>(THEME.current);
    currentTheme === THEME.dark
      ? (newTheme = THEME.light)
      : (newTheme = THEME.dark);
    document.querySelector("body").classList.replace(currentTheme, newTheme);
    this.storage.save(THEME.current, newTheme);
    this.isDarkMode();
  };

  isDarkMode = (): boolean =>
    (this.darkMode = this.storage.get<string>(THEME.current) === THEME.dark);

  /**For sign in dialog */
  openAuthDialog = (): void => {
    this.dialog.open(SigninComponent, {
      minWidth: "30vw",
    });
  };

  logout = (): void => {
    this.auth.signOut().subscribe((_) => this.router.navigate([""]));
  };
}

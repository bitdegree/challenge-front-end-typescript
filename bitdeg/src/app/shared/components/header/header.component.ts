import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { User } from "@core/models";
import { UntilDestroy } from "@ngneat/until-destroy";
import { AuthService } from "@shared/services/auth.service";
import { SigninComponent } from "app/auth/signin/signin.component";
import { Observable } from "rxjs";

@UntilDestroy({ checkProperties: true })
@Component({
  selector: "bitdeg-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  user$: Observable<User>;
  darkMode: boolean;
  constructor(
    private auth: AuthService,
    private dialog: MatDialog,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.user$ = this.auth.activeUser;
    this.darkMode = this.check();
  }

  test() {
    const body = document.querySelector("body");
    body.classList.contains("light-theme")
      ? body.classList.replace("light-theme", "dark-theme")
      : body.classList.contains("dark-theme")
      ? body.classList.replace("dark-theme", "light-theme")
      : body.classList.add("dark-theme");
    this.darkMode = this.check();
  }

  check(): boolean {
    return document.querySelector("body").classList.contains("dark-theme");
  }

  openAuthDialog = (): void => {
    this.dialog.open(SigninComponent, {
      minWidth: "30vw",
    });
  };

  logout = (): void => {
    this.auth.signOut().subscribe((_) => this.router.navigate([""]));
  };
}

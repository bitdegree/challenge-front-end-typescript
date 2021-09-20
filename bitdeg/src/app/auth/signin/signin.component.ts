import { Component, Inject, OnInit } from "@angular/core";
import { UntilDestroy } from "@ngneat/until-destroy";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { UserService } from "@shared/services/user.service";
import { Observable } from "rxjs";
import { User } from "@core/models";
import { AuthService } from "@shared/services/auth.service";
import { Router } from "@angular/router";

@UntilDestroy({ checkProperties: true })
@Component({
  selector: "bitdeg-signin",
  templateUrl: "./signin.component.html",
  styleUrls: [],
})
/**
 * This component mimics an authentication logic, providing user
 * with a list of available users to choose from in-order
 * to be authenticated, as api does not support creating a new user
 * and this would not be done in a real world situation
 */
export class SigninComponent implements OnInit {
  availableUsers: Observable<Array<User>>;
  selectedUser: User;
  constructor(
    private auth: AuthService,
    private userSer: UserService,
    private router: Router,
    private dialogRef: MatDialogRef<SigninComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { redirect: boolean; url: string },
  ) {}

  ngOnInit(): void {
    this.availableUsers = this.userSer.users;
  }

  close = (): void => this.dialogRef.close();

  /**Redirect user if user was trying to access guarded route before prompted to signin */
  signin = (user: User): void => {
    this.auth.signIn(user).subscribe((_) => {
      this.dialogRef.close(true);
      this.data.redirect && this.router.navigate([`/${this.data.url}`]);
    });
  };
}

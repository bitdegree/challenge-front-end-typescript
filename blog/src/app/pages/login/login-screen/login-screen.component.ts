import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SubscriptionLike } from 'rxjs';
import { login, logout } from 'src/app/store/actions/login.action';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { State } from 'src/app/store/reducers/store.reducer';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit, OnDestroy {
  subscribes: SubscriptionLike[] = [];

  constructor(private store: Store<{ state: State }>,
              readonly userService : UserService,
              readonly router: Router,
              readonly activatedRoute : ActivatedRoute) {}

  user$!: User | undefined;

  userName !: string;

  wrongLogIn : boolean = false;

  allUsers !: User;
  
  alertShow : boolean = false;

  ngOnInit(): void {
    const sub = this.store.select('state').subscribe(data => this.user$ = data.user)
    this.subscribes.push(sub);
    this.findAllUsers();
  }

  //fetching all users data in order to check if user entered valid username
  findAllUsers(){
    const sub = this.userService.getUsers().subscribe(data => {
      this.userService.Users = data;
    })
    this.subscribes.push(sub);
  }

  loggedOut(){
    this.store.dispatch(logout());
  }


  //checking if user used valid username if so then redirect her/him to home page
  logIn(){
    if(this.userService.Users.filter(user => user.username == this.userName).length <= 0){
      this.wrongLogIn = true;
    }
    else {
      const user = this.userService.Users.filter(user => user.username == this.userName)[0];
      this.store.dispatch(login(user));
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy(): void {
    while(this.subscribes.length > 0) {
      this.subscribes.pop()?.unsubscribe();
    }
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SubscriptionLike } from 'rxjs';
import { login, logout } from 'src/app/store/actions/login.action';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { State } from 'src/app/store/reducers/store.reducer';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit, OnDestroy {
  subscribes: SubscriptionLike[] = [];

  constructor(private store: Store<{ state: State }>,
              readonly userService : UserService) {}

  user$!: User | undefined;

  UserName !: string;

  WrongLogIn : boolean = false;

  AllUsers !: User;


  AlertShow : boolean = false;

  ngOnInit(): void {
    const sub = this.store.select('state').subscribe(data => this.user$ = data.user)
    this.subscribes.push(sub);
    this.findAllUsers();
  }

  findAllUsers(){
    const sub = this.userService.getUsers().subscribe(data => {
      this.userService.Users = data;
    })
    this.subscribes.push(sub);
  }

  loggedOut(){
    this.store.dispatch(logout());
  }

  logIn(){
    if(this.userService.Users.filter(user => user.username == this.UserName).length <= 0){
      this.WrongLogIn = true;
    }
    else {
      const user = this.userService.Users.filter(user => user.username == this.UserName)[0];
      this.store.dispatch(login(user));
    }
  }

  ngOnDestroy(): void {
    while(this.subscribes.length > 0) {
      this.subscribes.pop()?.unsubscribe();
    }
  }

}

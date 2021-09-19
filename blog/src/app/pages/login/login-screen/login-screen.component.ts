import { Component, OnDestroy, OnInit } from '@angular/core';
import { State, Store } from '@ngrx/store';
import { Observable, SubscriptionLike } from 'rxjs';
import { login } from 'src/app/store/actions/login.action';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit, OnDestroy {
  user$!: User;
  subscribes: SubscriptionLike[] = [];

  constructor(private store: Store<{ state: User }>,
              readonly userService : UserService) { 
    
    
              }
  ngOnDestroy(): void {
    while(this.subscribes.length > 0) {
      this.subscribes.pop()?.unsubscribe();
    }
  }

  ngOnInit(): void {
    const sub = this.store.select('state').subscribe(i => this.user$ = i)
    this.subscribes.push(sub);
  }

  deneme(){
    console.log(this.user$)
  }

  deneme2(){
    this.userService.getUser(2).subscribe(user => {
      this.store.dispatch(login(user));
    })
  }

}

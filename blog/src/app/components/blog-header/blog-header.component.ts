import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SubscriptionLike } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { State } from 'src/app/store/reducers/store.reducer';

@Component({
  selector: 'app-blog-header',
  templateUrl: './blog-header.component.html',
  styleUrls: ['./blog-header.component.css']
})
export class BlogHeaderComponent implements OnInit,OnDestroy {
  subscribes: SubscriptionLike[] = [];

  constructor(private store: Store<{ state: State }>,
              readonly router: Router) { }

  user$!: User | undefined;

  ngOnInit(): void {
    const sub = this.store.select('state').subscribe(data => this.user$ = data.user)
    this.subscribes.push(sub);
  }

  toHomePage(){
    this.router.navigate(['/']);
  }

  toLoginPage(){
    this.router.navigate(['/login']);
  }

  toCreatePage(){
    this.router.navigate(['/post/create']);
  }

  ngOnDestroy(): void {
    while(this.subscribes.length > 0) {
      this.subscribes.pop()?.unsubscribe();
    }
  }

}

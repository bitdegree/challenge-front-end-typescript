import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SubscriptionLike } from 'rxjs';
import { Post, PostEmpty } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { PostService } from 'src/app/services/post.service';
import { State } from 'src/app/store/reducers/store.reducer';

@Component({
  selector: 'app-post-create-screen',
  templateUrl: './post-create-screen.component.html',
  styleUrls: ['./post-create-screen.component.css']
})
export class PostCreateScreenComponent implements OnInit, OnDestroy {

  subscribes: SubscriptionLike[] = [];

  constructor(readonly activatedRoute: ActivatedRoute,
    readonly router: Router,
    readonly store: Store<{ state: State }>,
    readonly postService: PostService) { }

  user$!: User | undefined;

  post !: Post | PostEmpty;

  isEdit: boolean = false; //determines whether is this new post creation or editing existing one

  sumbitClicked: boolean = false; //this variable making sure error messages won't show before clicking the submit button

  ngOnInit(): void {
    const sub = this.activatedRoute.params.subscribe(param => {
      if (param.postID) {
        this.findPost(param.postID) //if there is parameter then we are fetching data for editing
        this.isEdit = true;
      }
      else {
        this.checkIfLoggedIn(); //I'm making sure user is logged in before creating new post
        this.post = {} as PostEmpty
      }
    });
    this.subscribes.push(sub);
  }

  findPost(postID: number) {
    const sub = this.postService.getPost(postID).subscribe(data => this.post = data);
    this.subscribes.push(sub);
  }

  checkIfLoggedIn() {
    const sub = this.store.select('state').subscribe(data => {
      if (!data.user)
        this.router.navigate(['/login']); //if user isn't logged in we are routing her/him to login page
      else
        this.user$ = data.user;
    })
    this.subscribes.push(sub);
  }

  submit() {
    this.sumbitClicked = true;
    if (this.isEdit) {
      const request = {
        body: this.post.body,
        title: this.post.title,
        id: this.post.id,
        userId: this.post.userId
      } as Post;
      const sub = this.postService.updatePost(request).subscribe();
      this.subscribes.push(sub);
    }
    else {
      const request = {
        body: this.post.body,
        title: this.post.title,
        userId: this.user$?.id
      } as Post;
      const sub = this.postService.createPost(request).subscribe();
      this.subscribes.push(sub);
    }
  }

  ngOnDestroy(): void {
    while (this.subscribes.length > 0) {
      this.subscribes.pop()?.unsubscribe();
    }
  }

}

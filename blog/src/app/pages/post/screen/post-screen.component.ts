import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionLike } from 'rxjs';
import { PostComment } from 'src/app/models/comment.model';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post-screen',
  templateUrl: './post-screen.component.html',
  styleUrls: ['./post-screen.component.css'],
})
export class PostScreenComponent implements OnInit,OnDestroy {
  
  subscribes: SubscriptionLike[] = [];

  constructor(private activatedRoute: ActivatedRoute,
    readonly router: Router,
    readonly postService: PostService,
    readonly userService: UserService,
    readonly commentService: CommentService) { }


  post !: Post;
  comments !: PostComment[];
  user !: User;

  //Globals For Alert

  notificationSuccess: boolean = false;
  notificationDanger: boolean = false;

  alertType !: number;
  alertMessage !: string;
  displayTime : number = 0;

  ngOnInit(): void {
    const sub = this.activatedRoute.params.subscribe(param => {
      this.findPost(param.postID); //fecting post data
      this.findComments(param.postID); //fetching comments
    });
    this.subscribes.push(sub);
  }

  findPost(postID: number) {
    //if service already have the post user needs then fetch it from service, otherwise fetch it with request
    if (this.postService.Posts && this.postService.Posts.filter(i => i.id == postID).length > 0) {
      this.post = this.postService.Posts.filter(i => i.id == postID)[0];
      this.findUser(this.post.userId);
    }
    else {
      const sub = this.postService.getPost(postID).subscribe(data => {
        if (data == undefined)
          this.router.navigateByUrl('');
        else
          this.post = data;
        this.findUser(data.userId)
      })
      this.subscribes.push(sub);
    }
  }

  findComments(postID: number) {
    const sub = this.commentService.getPostComments(postID).subscribe(data => this.comments = [...data]);
    this.subscribes.push(sub);
  }

  findUser(userID: number) {
    //if service already have the user information needs then fetch it from service, otherwise fetch it with request
    if (this.userService.Users && this.userService.Users.filter(i => i.id == userID).length > 0) {
      this.user = this.userService.Users.filter(i => i.id == userID)[0];
    }
    else {
      const sub = this.userService.getUser(userID).subscribe(data => {
        this.user = data;
      })
      this.subscribes.push(sub);
    }
  }

  //making sure alert component show right after button clicked
  commentSubmitted(e: PostComment) {
    this.displayTime = 0;
    const sub = this.commentService.createPostComments(e).subscribe(data => {
      if (data) {
        this.comments.push(e)
        this.alertType = 1;
        this.alertMessage = 'Your Comment Successfully Added'
        this.displayTime = 5000;
      }
      else {
        this.alertType = 2;
        this.alertMessage = 'Something Went Wrong, Please Try Again Later'
        this.displayTime = 5000;
      }
    }
    );
    this.subscribes.push(sub);
  }

  editClicked(){
    this.router.navigate(['/post/create/', this.post.id])
  }

  ngOnDestroy(): void {
    while(this.subscribes.length > 0) {
      this.subscribes.pop()?.unsubscribe();
    }
  }


}

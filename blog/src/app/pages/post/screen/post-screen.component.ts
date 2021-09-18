import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
export class PostScreenComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    readonly router: Router,
    readonly postService: PostService,
    readonly userService: UserService,
    readonly commentService: CommentService) { }

  Post !: Post;
  Comments !: PostComment[];
  User !: User;

  NotificationSuccess: boolean = false;
  NotificationDanger: boolean = false;

  AlertType !: number;
  AlertMessage !: string;
  DisplayTime : number = 0;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(i => {
      this.findPost(i.postID);
      this.findComments(i.postID);
    });
  }

  findPost(postID: number) {
    if (this.postService.Posts && this.postService.Posts.filter(i => i.id == postID).length > 0) {
      this.Post = this.postService.Posts.filter(i => i.id == postID)[0];
      this.findUser(this.Post.userId);
    }
    else {
      this.postService.getPost(postID).subscribe(data => {
        if (data == undefined)
          this.router.navigateByUrl('');
        else
          this.Post = data;
        this.findUser(data.userId)
      })
    }
  }

  findComments(postID: number) {
    this.commentService.getPostComments(postID).subscribe(data => this.Comments = [...data]);
  }

  findUser(userID: number) {
    if (this.userService.Users && this.userService.Users.filter(i => i.id == userID).length > 0) {
      this.User = this.userService.Users.filter(i => i.id == userID)[0];
    }
    else {
      this.userService.getUser(userID).subscribe(data => {
        this.User = data;
      })
    }
  }

  CommentSubmitted(e: PostComment) {
    this.DisplayTime = 0;
    const _this = this;
    this.commentService.createPostComments(e).subscribe(data => {
      if (data) {
        this.Comments.push(e)
        this.AlertType = 1;
        this.AlertMessage = 'Your Comment Successfully Added'
        this.DisplayTime = 5000;
      }
      else {
        this.AlertType = 2;
        this.AlertMessage = 'Something Went Wrong, Please Try Again Later'
        this.DisplayTime = 5000;
      }
    }
    );
  }


}

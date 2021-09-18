import { Component, HostListener, OnInit } from '@angular/core';
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
  styleUrls: ['./post-screen.component.css']
})
export class PostScreenComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              readonly router : Router,
              readonly postService: PostService,
              readonly userService: UserService,
              readonly commentService: CommentService) { }

  Post !: Post;
  Comments !: PostComment[];
  User !: User;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(i => {
      this.findPost(i.postID);
      this.findComments(i.postID);
    });
  }

  findPost(postID: number) {
    if (this.postService.Posts && this.postService.Posts.filter(i => i.id == postID).length > 0) {
      this.Post =  this.postService.Posts.filter(i => i.id == postID)[0];
      this.findUser(this.Post.userId);
    }
    else{
      this.postService.getPost(postID).subscribe(data => {
        if(data == undefined)
          this.router.navigateByUrl('');
        else 
          this.Post = data;
          this.findUser(data.userId)
      })
    }
  }

  findComments(postID:number){
    this.commentService.getPostComments(postID).subscribe(data => this.Comments = [...data]);
  }

  findUser(userID:number){
    if (this.userService.Users && this.userService.Users.filter(i => i.id == userID).length > 0) {
      this.User =  this.userService.Users.filter(i => i.id == userID)[0];
    }
    else{
      this.userService.getUser(userID).subscribe(data => {
          this.User = data;
      })
    }
  }


}

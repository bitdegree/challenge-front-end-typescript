import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-screen',
  templateUrl: './user-screen.component.html',
  styleUrls: ['./user-screen.component.css']
})
export class UserScreenComponent implements OnInit {

  constructor(readonly activatedRoute : ActivatedRoute,
              readonly userService : UserService,
              readonly postService : PostService) { }

  User !: User;
  UserPosts !: Post[];

  LatestPostCount = 10;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(i => {
      this.findUser(i.userID);
      this.getLatestUserPosts(i.userID,0,this.LatestPostCount);
    });
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

  getLatestUserPosts(userID:number,start:number,end:number){
    this.postService.getPostsOnlyOneUserWithBoundry(userID,start,end)
    .subscribe(data => this.UserPosts = [...data]
      .sort((a, b) => a.id < b.id ? 1 : a.id > b.id ? -1 : 0)); //I ordered the posts because bigger id means latest created among posts.
  }

}
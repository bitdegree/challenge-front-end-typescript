import { Component, HostListener, OnInit } from '@angular/core';
import { BlogPost, Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {

  constructor(readonly postService: PostService,
    readonly userService: UserService) { }

  BlogPosts : any[] = [];

  ShownPostsCount = 0;
  triggerMorePostsOnce = false;

  ngOnInit(): void {
    this.getUsers();
    this.showMorePosts(10);
  }

  getPosts(start: number, end: number) {
    this.postService.getPostWithBoundry(start, end)
      .subscribe(
        data => {
          this.postService.Posts = this.postService.Posts.concat(...data);
          this.triggerMorePostsOnce = false;
          this.mergePostWithAuthors();
        }
      );
  }

  getUsers() {
    if(this.userService.Users == undefined)
    this.userService.getUsers()
      .subscribe(
        data => {
          this.userService.Users = [...data];
          this.mergePostWithAuthors();
        }
      );
  }

  showMorePosts(howMany: number) {
    if(this.ShownPostsCount >= this.postService.Posts.length) {
      this.getPosts(this.ShownPostsCount, this.ShownPostsCount + howMany);
    }
    else {
      this.triggerMorePostsOnce = false;
      this.mergePostWithAuthors();
    }
    this.ShownPostsCount += howMany;
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !this.triggerMorePostsOnce) {
      this.triggerMorePostsOnce = true
      this.showMorePosts(5);
    }
  }

  mergePostWithAuthors(){
    if(this.userService.Users != undefined && this.postService.Posts != undefined)
    this.BlogPosts = this.postService.Posts.map( item => Object.assign({}, this.userService.Users[item.userId],item));
  }


}

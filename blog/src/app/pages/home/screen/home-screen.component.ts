import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { SubscriptionLike } from 'rxjs';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit, OnDestroy {

  subscribes: SubscriptionLike[] = [];

  constructor(readonly postService: PostService,
    readonly userService: UserService) { }


  blogPosts: any[] = []; //Array to hold merged arrays, user and posts

  shownPostsCount = 0; //Store how many post is shown at home page since it is infinite scroll
  triggerMorePostsOnce = false; //Variable to make sure won't fetch data since scroll event may trigger more than once

  ngOnInit(): void {
    this.getUsers();
    this.showMorePosts(10); //I started with 10 post only at first
  }

  // Get Posts only that shown in the page
  getPosts(start: number, end: number) {
    const sub = this.postService.getPostWithBoundry(start, end)
      .subscribe(
        data => {
          this.postService.Posts = this.postService.Posts.concat(...data); 
          this.triggerMorePostsOnce = false;
          this.mergePostWithAuthors(); 
        }
      );
    this.subscribes.push(sub);
  }

  //get all users in order to merge them with posts authors
  getUsers() {
    if (this.userService.Users == undefined) {
      let sub = this.userService.getUsers()
        .subscribe(
          data => {
            this.userService.Users = [...data];
            this.mergePostWithAuthors();
          }
        );
      this.subscribes.push(sub);
    }
  }

  //handling more whenever scroll event triggered
  showMorePosts(howMany: number) {
    if (this.shownPostsCount >= this.postService.Posts.length) {
      this.getPosts(this.shownPostsCount, this.shownPostsCount + howMany);
    }
    else {
      this.triggerMorePostsOnce = false;
      this.mergePostWithAuthors();
    }
    this.shownPostsCount += howMany;
  }

  //listening scroll and if it gots the bottom, load more posts
  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !this.triggerMorePostsOnce) {
      this.triggerMorePostsOnce = true
      this.showMorePosts(5);
    }
  }

  //merging 2 arrays into one
  mergePostWithAuthors() {
    if (this.userService.Users != undefined && this.postService.Posts != undefined)
      this.blogPosts = this.postService.Posts.map(item => Object.assign({}, this.userService.Users.filter(u => u.id == item.userId)[0], item));
  }

  ngOnDestroy(): void {
    while(this.subscribes.length > 0) {
      this.subscribes.pop()?.unsubscribe();
    }
  }

}

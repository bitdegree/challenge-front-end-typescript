import { Component, HostListener, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
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

  Posts !: Post[];
  Users !: User[];

  ShownPostsCount = 10;

  ngOnInit(): void {
    this.getPosts();
    this.getUsers();
  }

  getPosts() {
    this.postService.getPosts()
      .subscribe(
        data => this.Posts = [...data]
          .sort((a, b) => a.id < b.id ? 1 : a.id > b.id ? -1 : 0)
      ); //I sort the data since I want my first element be to last created post
  }

  getUsers(){
    this.userService.getUsers()
      .subscribe(
        data => this.Users = [...data]
      ); 
  }

  showMorePosts(howMany : number){
    this.ShownPostsCount += howMany;
    if(this.ShownPostsCount >= this.Posts.length )
      this.ShownPostsCount = this.Posts.length;
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.showMorePosts(5);
    }
  }

}

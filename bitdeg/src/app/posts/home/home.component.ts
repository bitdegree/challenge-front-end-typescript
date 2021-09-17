import { Component, OnInit } from "@angular/core";
import { BlogPost, PageSearch, Post, User } from "@core/models";
import { UntilDestroy } from "@ngneat/until-destroy";
import { PostService } from "@posts/post.service";
import { PhotoService } from "@shared/services/photo.service";
import { UserService } from "@shared/services/user.service";
import { combineLatest, Observable } from "rxjs";
import { map } from "rxjs/operators";

@UntilDestroy({ checkProperties: true })
@Component({
  selector: "bitdeg-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  postsPageSearch: PageSearch<Post> = new PageSearch(new Post());
  usersPageSearch: PageSearch<User> = new PageSearch(new User());
  posts$: Observable<Array<BlogPost>>;
  constructor(
    private posts: PostService,
    private users: UserService,
    private photos: PhotoService,
  ) {}

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts = (): void => {
    this.posts$ = combineLatest([
      this.posts.findAll(this.postsPageSearch),
      this.users.findAll(this.usersPageSearch),
      this.photos.find(),
    ]).pipe(
      map(([posts, users, photo]) => {
        return posts.map((post) => {
          /**Find the author of this post and add it to the post payload, making it a @type BlogPost */
          const author = users.find((user) => user.id === post.userId);
          return {
            body: post.body,
            id: post.id,
            title: post.title,
            userId: post.userId,
            user: author,
            images: {
              thumbnail: photo.thumbnailUrl,
              original: photo.url,
            },
          } as BlogPost;
        });
      }),
    );
  };
}

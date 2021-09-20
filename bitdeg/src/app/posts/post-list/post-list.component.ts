import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BlogPost, PageSearch, Post, User } from "@core/models";
import { hashDetail, hyphenIze } from "@core/utils";
import { UntilDestroy } from "@ngneat/until-destroy";
import { PostService } from "@posts/post.service";
import { LoaderService } from "@shared/services/loader.service";
import { PhotoService } from "@shared/services/photo.service";
import { UserService } from "@shared/services/user.service";
import { combineLatest, Observable } from "rxjs";
import { map } from "rxjs/operators";

@UntilDestroy({ checkProperties: true })
@Component({
  selector: "bitdeg-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.scss"],
})
export class PostListComponent implements OnInit {
  postsPageSearch: PageSearch<Post> = new PageSearch(new Post());
  usersPageSearch: PageSearch<User> = new PageSearch(new User());
  posts$: Observable<Array<BlogPost>>;
  loading$: Observable<boolean>;

  hashParam = hashDetail;
  hyphenise = hyphenIze;
  constructor(
    private postSe: PostService,
    private userSe: UserService,
    private photoSe: PhotoService,
    private router: Router,
    private loader: LoaderService,
  ) {}

  ngOnInit(): void {
    this.loading$ = this.loader.loading$;
    this.getAllPosts();
  }

  /**Since posts api does not return user payload, combine all data needed to display blog
   * post: Post, User, Photo
   */
  getAllPosts = (): void => {
    this.posts$ = combineLatest([
      this.postSe.findAll(this.postsPageSearch),
      this.userSe.findAll(this.usersPageSearch),
      this.photoSe.find(),
    ]).pipe(
      map(([posts, users, photo]) => {
        return posts.map((post) => {
          /**Save users inorder to be used in fake authentication to select user when creating a post */
          this.userSe.users.next(users);
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

  toCreatePost = (): void => {
    this.router.navigate(["/create-post"]);
  };
}

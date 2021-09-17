import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BlogPost } from "@core/models";
import { isObjectEmpty, unHashDetail } from "@core/utils";
import { UntilDestroy } from "@ngneat/until-destroy";
import { PostService } from "@posts/post.service";
import { PhotoService } from "@shared/services/photo.service";
import { UserService } from "@shared/services/user.service";
import { combineLatest } from "rxjs";
import { map } from "rxjs/operators";

@UntilDestroy({ checkProperties: true })
@Component({
  selector: "bitdeg-post-details",
  templateUrl: "./post-details.component.html",
  styleUrls: ["./post-details.component.scss"],
})
export class PostDetailsComponent implements OnInit {
  post: BlogPost;
  editMode: boolean;
  constructor(
    private posts: PostService,
    private users: UserService,
    private photos: PhotoService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.getRequestParams();
  }

  /**
   * Get post id from route params and make post details request, only if
   * post object does not exist in route state(for example if page is reloaded)
   * If no post id in route, redirect user to home
   */
  getRequestParams = (): void => {
    this.route.params.subscribe((data) => {
      if (!isObjectEmpty(data)) {
        const postId = unHashDetail(data.pId);
        const userId = unHashDetail(data.uId);
        this.getPost(+postId, +userId);
      } else this.redirect();
    });
  };

  getPost = (postId: number, userId: number): void => {
    const state = this.location.getState() as { post: BlogPost };
    if (!state[`post`]) {
      combineLatest([
        this.posts.find(postId),
        this.users.find(userId),
        this.photos.find(),
      ])
        .pipe(
          map(([post, user, photo]) => {
            return {
              body: post.body,
              id: post.id,
              title: post.title,
              userId: post.userId,
              user: user,
              images: {
                thumbnail: photo.thumbnailUrl,
                original: photo.url,
              },
            } as BlogPost;
          }),
          map((post) => (this.post = post)),
        )
        .subscribe();
    }
  };

  redirect = (): void => {
    this.router.navigate([""]);
  };
}

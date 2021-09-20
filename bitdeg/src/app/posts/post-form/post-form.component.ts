import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Post } from "@core/models";
import { UntilDestroy } from "@ngneat/until-destroy";
import { PostService } from "@posts/post.service";
import { AuthService } from "@shared/services/auth.service";
import { LoaderService } from "@shared/services/loader.service";
import { EMPTY, Observable, of } from "rxjs";
import { debounceTime, exhaustMap, tap } from "rxjs/operators";

@UntilDestroy({ checkProperties: true })
@Component({
  selector: "bitdeg-post-form",
  templateUrl: "./post-form.component.html",
  styleUrls: ["./post-form.component.scss"],
})
export class PostFormComponent implements OnInit {
  postForm: FormGroup;
  savedAt: number;
  @Input() post: Post;
  @Output() editSaved = new EventEmitter<Post>();
  editMode: boolean;
  userId: number; //signed in user id
  loading$: Observable<boolean>;
  constructor(
    private fb: FormBuilder,
    private posts: PostService,
    private auth: AuthService,
    private router: Router,
    private loader: LoaderService,
  ) {}

  ngOnInit(): void {
    this.auth.activeUser.subscribe((user) => (this.userId = user?.id));
    this.getUserId();
    this.loading$ = this.loader.loading$;
  }

  getUserId = (): void => {
    if (this.userId) {
      this.editMode = this.post && true;
      this.initForm();
      this.autoSave();
    } else this.redirect();
  };

  initForm = (): void => {
    this.postForm = this.fb.group({
      title: [this.post?.title, [Validators.required]],
      body: [
        this.post?.body ?? " ",
        [Validators.required],
      ] /**Whitespace to avoid sending null during autosave */,
      userId: [this.post?.userId ?? this.userId, [Validators.required]],
    });
  };

  isFormValid = (): boolean => {
    if (this.postForm.invalid) this.postForm.markAllAsTouched();
    return this.postForm.valid;
  };

  /**
   * Save changes to form every 15 seconds provided form is valid
   */
  autoSave = (): void => {
    this.postForm.valueChanges
      .pipe(
        debounceTime(1000),
        exhaustMap((post, index) => {
          if (this.isFormValid()) {
            return index > 1 || this.editMode
              ? this.posts.update(post)
              : this.posts.create(post);
          }
          return EMPTY;
        }),
        tap(() => !this.editMode && (this.editMode = true)),
      )
      .subscribe((resp) => {
        if (resp) this.savedAt = Date.now();
        this.post = resp;
      });
  };

  /**
   * On edit mode @property editSaved is emited to a parent component,
   * which would switch its mode to read view. This allows for easy edit
   * without navigating to a new page
   */

  save = (): void => {
    if (this.isFormValid()) {
      const post = this.postForm.value;
      const req = this.editMode
        ? this.posts.update(post)
        : this.posts.create(post);
      req.pipe(exhaustMap((resp) => of(resp))).subscribe((post) => {
        this.post = post;
        this.savedAt = Date.now();
        if (this.editMode) this.editSaved.emit(this.post);
      });
    }
  };

  redirect = (): void => {
    this.router.navigate([""]);
  };
}

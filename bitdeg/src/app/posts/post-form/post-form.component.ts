import { Location } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Post } from "@core/models";
import { UntilDestroy } from "@ngneat/until-destroy";
import { PostService } from "@posts/post.service";
import { of } from "rxjs";
import { concatMap, delay, exhaustMap, tap } from "rxjs/operators";

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
  @Output() editSaved = new EventEmitter<boolean>();
  editMode: boolean;
  constructor(
    private fb: FormBuilder,
    private posts: PostService,
    private location: Location,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getUserId();
  }

  getUserId = (): void => {
    if (this.userId) {
      this.editMode = this.post && true;
      this.initForm();
    } else this.redirect();
  };

  initForm = (): void => {
    this.postForm = this.fb.group({
      title: [this.post?.title, [Validators.required]],
      body: [this.post?.body, [Validators.required]],
      userId: [this.post?.body ?? this.userId, [Validators.required]],
    });
  };

  get userId(): number {
    return (<{ id: number }>this.location.getState()).id;
  }

  isFormValid = (): boolean => {
    if (this.postForm.invalid) this.postForm.markAllAsTouched();
    return this.postForm.valid;
  };

  /**
   * Save changes to form every 5 seconds provided form is valid
   */
  autoSave = (): void => {
    this.postForm.valueChanges
      .pipe(
        delay(5000),
        concatMap((post) => this.isFormValid() && this.posts.create(post)),
        tap({
          //any error the error handler allows to reach this point is a 405 which means post already created
          error: (err) => (this.editMode = true),
        }),
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
        if (this.editMode) this.editSaved.emit(true);
      });
    }
  };

  redirect = (): void => {
    this.router.navigate([""]);
  };
}

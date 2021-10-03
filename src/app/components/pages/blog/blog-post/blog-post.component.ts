import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/components/shared/dialog/dialog.component';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css'],
})
export class BlogPostComponent implements OnInit {
  isToolbar = false;
  inputTitle: string;
  inputBlog: string;
  currentPosition: any;
  startPosition: number;

  constructor(
    private blogService: BlogService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {}

  private scrollChangeCallback: () => void;

  onContentScrolled(e: any): void {
    this.startPosition = e.srcElement.scrollTop;
    let scroll = e.srcElement.scrollTop;
    if (scroll > this.currentPosition) {
      this.isToolbar = false;
    } else {
      this.isToolbar = true;
    }
    this.currentPosition = scroll;
  }

  ngAfterViewInit(): void {
    this.scrollChangeCallback = () => this.onContentScrolled(event);
    window.addEventListener('scroll', this.scrollChangeCallback, true);
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scrollChangeCallback, true);
  }

  scrollToTop(): void {
    var element = document.querySelector('#top') as HTMLElement;
    element.scrollIntoView({ behavior: 'smooth' });
  }

  goToHome(): void {
    this.router.navigate(['/']);
    setTimeout(() => this.scrollToTop(), 333);
  }

  onSubmit(): void {
    if (!this.inputTitle || !this.inputBlog) return;

    const newBlog = {
      title: this.inputTitle,
      blog: this.inputBlog,
    };

    this.blogService.postBlog(newBlog).subscribe((response) => {
      // Handle response
      response;
      this.openDialog();
    });
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { title: this.inputTitle, secondaryButton: 'Post Again' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.goToHome();
      else {
        this.router.navigate(['blog/post']);
      }
    });
  }
}

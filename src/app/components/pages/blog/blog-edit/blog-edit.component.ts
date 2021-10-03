import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'src/app/components/shared/dialog/dialog.component';
import { BlogService } from 'src/app/services/blog.service';
import { Blog } from '../../home/blogs/blogs';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css'],
})
export class BlogEditComponent implements OnInit {
  isToolbar = false;
  inputTitle: string;
  inputBlog: string;
  currentPosition: number;
  startPosition: number;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const route = this.route.snapshot.params.name;
    const endpoint = route === '1' ? '1' : route - 1 + '1';

    this.blogService.getBlog(endpoint).subscribe((blog: Blog) => {
      this.inputTitle = blog.title;
      this.inputBlog = blog.body;
    });
  }

  private scrollChangeCallback: () => void;

  ngAfterViewInit(): void {
    this.scrollChangeCallback = () => this.onContentScrolled(event);
    window.addEventListener('scroll', this.scrollChangeCallback, true);
  }

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

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scrollChangeCallback, true);
  }

  scrollToTop(): void {
    var element = document.querySelector('#top') as HTMLElement;
    element.scrollIntoView({ behavior: 'smooth' });
  }

  goBack(): void {
    this.router.navigate([this.router.url.replace('edit', '')]);
    setTimeout(() => this.scrollToTop(), 333);
  }

  onSubmit(): void {
    if (!this.inputTitle || !this.inputBlog) return;

    const updatedBlog = {
      title: this.inputTitle,
      blog: this.inputBlog,
    };

    this.blogService.updateBlog(updatedBlog).subscribe(
      (response) => {
        // Handle response
        response;
        this.openDialog();
      },
      (error) => {
        // Handle error
        error;
        this.openDialog();
      }
    );
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { title: this.inputTitle, secondaryButton: 'Edit Again' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.goBack();
      else {
        this.router.navigate([this.router.url]);
      }
    });
  }
}

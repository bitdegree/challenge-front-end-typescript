import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { CONSTANTS } from 'src/assets/constants';
import { photo } from 'src/utils/types';
import { Blog, UpdatedBlog } from '../../home/blogs/blogs';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css'],
})
export class BlogEditComponent implements OnInit {
  blog: Blog;
  toolbar = false;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const route = this.route.snapshot.params.name;
    const endpoint = route === '1' ? '1' : route - 1 + '1';
    const photoId = ('photo' + route) as photo['photos'];
    const photo = CONSTANTS[photoId];

    this.blogService.getBlog(endpoint).subscribe((blog: Blog) => {
      const updatedBlog = { ...blog, photo };
      this.blog = updatedBlog;
    });
  }

  private scrollChangeCallback: () => void;
  currentPosition: number;
  startPosition: number;

  ngAfterViewInit() {
    this.scrollChangeCallback = () => this.onContentScrolled(event);
    window.addEventListener('scroll', this.scrollChangeCallback, true);
  }

  onContentScrolled(e: any) {
    this.startPosition = e.srcElement.scrollTop;
    let scroll = e.srcElement.scrollTop;
    if (scroll > this.currentPosition) {
      this.toolbar = false;
    } else {
      this.toolbar = true;
    }
    this.currentPosition = scroll;
  }

  ngOnDestroy() {
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

  onSubmit() {
    // Handle empty input
    if (!this.blog.title) return console.log('Handle title');
    if (!this.blog.body) return console.log('Handle blog');

    const updatedBlog = {
      title: this.blog.title,
      blog: this.blog.body,
    };

    this.blogService.updateBlog(updatedBlog).subscribe((response) => {
      response;
      // Handle response
      console.log('Saved Successfully');
    });

    this.goBack();
  }
}

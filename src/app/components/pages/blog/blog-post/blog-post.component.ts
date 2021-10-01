import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { CONSTANTS } from 'src/assets/constants';
import { photo } from 'src/utils/types';
import { Blog } from '../../home/blogs/blogs';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css'],
})
export class BlogPostComponent implements OnInit {
  blog: Blog;
  toolbar = false;
  inputTitle: string;
  inputBlog: string;

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
      const newBlog = { ...blog, photo };
      this.blog = newBlog;
    });
  }

  private scrollChangeCallback: () => void;
  currentPosition: any;
  startPosition: number;

  ngAfterViewInit(): void {
    this.scrollChangeCallback = () => this.onContentScrolled(event);
    window.addEventListener('scroll', this.scrollChangeCallback, true);
  }

  onContentScrolled(e: any): void {
    this.startPosition = e.srcElement.scrollTop;
    let scroll = e.srcElement.scrollTop;
    if (scroll > this.currentPosition) {
      this.toolbar = false;
    } else {
      this.toolbar = true;
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

  goToHome(): void {
    this.router.navigate(['/']);
    setTimeout(() => this.scrollToTop(), 333);
  }

  onSubmit(): void {
    // Handle empty input
    if (!this.inputTitle) return console.log('Handle title');
    if (!this.inputBlog) return console.log('Handle blog');

    const newBlog = {
      title: this.inputTitle,
      blog: this.inputBlog,
    };

    this.blogService.postBlog(newBlog).subscribe((response) => {
      response;
      // Handle response
      console.log('Posted Successfully');
    });

    this.goToHome();
  }
}

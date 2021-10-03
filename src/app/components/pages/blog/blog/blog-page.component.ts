import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { makeBlog } from 'src/utils/functions';
import { Blog } from '../../home/blogs/blogs';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css'],
})
export class BlogComponent implements OnInit {
  blog: Blog;
  isToolbar = false;
  currentPosition: any;
  startPosition: number;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    const route = this.route.snapshot.params.name;
    const endpoint = route === '1' ? '1' : route - 1 + '1';

    this.blogService.getBlog(endpoint).subscribe((blog: Blog) => {
      this.blog = makeBlog(blog, route);
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
}

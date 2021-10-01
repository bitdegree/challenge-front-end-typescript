import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { photo } from 'src/utils/types';
import { Blog } from '../../home/blogs/blogs';
import { CONSTANTS } from '../../../../../assets/constants';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css'],
})
export class BlogComponent implements OnInit {
  blog: Blog;
  isLoaded = false;
  toolbar = false;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    const route = this.route.snapshot.params.name;
    const endpoint = route === '1' ? '1' : route - 1 + '1';
    const photoId = ('photo' + route) as photo['photos'];
    const photo = CONSTANTS[photoId];

    this.blogService.getBlog(endpoint).subscribe((blog: Blog) => {
      const titleArray = blog.title.split(' ');
      const titleLength = titleArray.length;
      const primaryTitle = titleArray.slice(0, titleLength / 2).join(' ');
      const secondaryTitle = titleArray.slice(titleLength / 2).join(' ');
      const updatedBlog = { ...blog, primaryTitle, secondaryTitle, photo };

      this.blog = updatedBlog;
    });
  }

  showPage(): void {
    this.isLoaded = true;
  }

  private scrollChangeCallback: () => void;
  currentPosition: any;
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
}

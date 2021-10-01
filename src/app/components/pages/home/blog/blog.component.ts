import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SortedBlog } from '../blogs/blogs';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  @Input() blog: SortedBlog;

  constructor(private route: Router) {}

  ngOnInit(): void {}

  scrollToTop(): void {
    var element = document.querySelector('#top') as HTMLElement;
    element.scrollIntoView({ behavior: 'smooth' });
  }

  goToPath(): void {
    this.route.navigate(['/blogs/' + this.blog.user]);
    setTimeout(() => this.scrollToTop(), 333);
  }
}

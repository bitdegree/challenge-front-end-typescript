import { Component, OnInit } from '@angular/core';
import { getPhotos, makeBlog } from 'src/utils/functions';
import { CONSTANTS } from './../../../../../assets/constants';
import { BlogService } from './../../../../services/blog.service';
import { Blog, Blogs, SortedBlog } from './blogs';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
})
export class BlogsComponent implements OnInit {
  sortedBlogs: SortedBlog[] = [];
  blogs: Blogs = [];
  users: number[];
  photos: string[] = getPhotos();

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogService.getBlogs().subscribe((blogs: Blog[]) => {
      const setBlog = (blog: Blog) => {
        const updatedBlog = makeBlog(blog, blog.userId.toString());
        const blogId = blog.userId - 1;

        this.blogs[blogId] = this.blogs[blogId]
          ? [...this.blogs[blogId], updatedBlog]
          : [updatedBlog];
      };

      const getUsers = () =>
        blogs.map((blog) => {
          setBlog(blog);
          return blog.userId;
        });

      this.users = [...new Set(getUsers())];

      this.users.map((user) =>
        this.sortedBlogs.push({
          user,
          blogs: this.blogs[user - 1],
          photo: this.photos[user - 1],
        })
      );
    });
  }
}

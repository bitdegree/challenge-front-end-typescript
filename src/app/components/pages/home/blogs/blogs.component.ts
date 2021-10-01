import { Component, OnInit } from '@angular/core';
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
  photos: string[] = [
    CONSTANTS.photo1,
    CONSTANTS.photo2,
    CONSTANTS.photo3,
    CONSTANTS.photo4,
    CONSTANTS.photo5,
    CONSTANTS.photo6,
    CONSTANTS.photo7,
    CONSTANTS.photo8,
    CONSTANTS.photo9,
    CONSTANTS.photo10,
  ];

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogService.getBlogs().subscribe((blogs: Blog[]) => {
      const setBlog = (blog: Blog) => {
        const titleArray = blog.title.split(' ');
        const titleLength = titleArray.length;
        const primaryTitle = titleArray.slice(0, titleLength / 2).join(' ');
        const secondaryTitle = titleArray.slice(titleLength / 2).join(' ');
        const updatedBlog = { ...blog, primaryTitle, secondaryTitle };
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

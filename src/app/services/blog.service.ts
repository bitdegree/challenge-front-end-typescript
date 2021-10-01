import { CONSTANTS } from './../../assets/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Blog,
  NewBlog,
  UpdatedBlog,
} from '../components/pages/home/blogs/blogs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private apiURL = CONSTANTS.blogsAPI;

  constructor(private http: HttpClient) {}

  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.apiURL);
  }

  getBlog(endpoint: string): Observable<Blog> {
    return this.http.get<Blog>(this.apiURL + '/' + endpoint);
  }

  postBlog(blog: NewBlog): Observable<NewBlog> {
    return this.http.post<NewBlog>(this.apiURL, blog, httpOptions);
  }

  updateBlog(blog: UpdatedBlog): Observable<UpdatedBlog> {
    return this.http.put<UpdatedBlog>(this.apiURL, blog, httpOptions);
  }
}

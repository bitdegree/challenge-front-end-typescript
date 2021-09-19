import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { environment } from "src/environments/environment"
import { Post } from "../models/post.model"
import { catchError } from 'rxjs/operators';
import { BaseService, httpOptions } from "./base.service"

@Injectable({
    providedIn: "root"
})

export class PostService extends BaseService {

    constructor(readonly httpClient: HttpClient) {
        super()
    }

    Posts: Post[] = []; /*alternative to a store object, since this can get more data 
    but of course this is not the best solution for this website however I wanted to show you that I can come up with diffrent approachs */

    //get all posts
    getPosts(): Observable<Post[]> {
        const url = environment.Endpoint.concat('posts');
        return this.httpClient.get<Post[]>(url)
            .pipe(
                catchError(
                    this.handleError<Post[]>('getPosts', [])
                )
            );
    }

    //get specific post by id
    getPost(postid: number): Observable<Post> {
        const url = environment.Endpoint.concat('posts/', postid.toString());
        return this.httpClient.get<Post>(url).
            pipe(
                catchError(
                    this.handleError<Post>('getPost', undefined)
                )
            );
    }

    //get post by boundries, like only getting 30th to 40th posts
    getPostWithBoundry(start: number, end: number): Observable<Post[]> {
        const url = environment.Endpoint.concat('posts?_start=', start.toString(), '&_end=', end.toString());
        return this.httpClient.get<Post[]>(url).
            pipe(
                catchError(
                    this.handleError<Post[]>('getPostWithBoundry', [])
                )
            );
    }

    //update post endpoint
    updatePost(post: Post): Observable<Post> {
        const url = environment.Endpoint.concat('posts/', post.id.toString());
        return this.httpClient.put<Post>(url, post,httpOptions).
            pipe(
                catchError(
                    this.handleError<Post>('updatePost', undefined)
                )
            );
    }

    //create post endpoint
    createPost(post: Post): Observable<Post> {
        const url = environment.Endpoint.concat('posts');
        return this.httpClient.post<Post>(url, post,httpOptions).
            pipe(
                catchError(
                    this.handleError<Post>('createPost', undefined)
                )
            );
    }

    //delete post endpoint
    deletePost(postid: number): Observable<Post> {
        const url = environment.Endpoint.concat('posts/', postid.toString());
        return this.httpClient.delete<Post>(url).
            pipe(
                catchError(
                    this.handleError<Post>('deletePost', undefined)
                )
            );
    }

    //get posts that belongs to one user
    getPostsOnlyOneUser(userID: number): Observable<Post[]> {
        const url = environment.Endpoint.concat('posts?userId=', userID.toString());
        return this.httpClient.get<Post[]>(url).
            pipe(
                catchError(
                    this.handleError<Post[]>('getPostsOnlyOneUser', [])
                )
            );
    }

    //get post that belongs to one user with boundries
    getPostsOnlyOneUserWithBoundry(userID: number, start: number, end: number): Observable<Post[]> {
        const url = environment.Endpoint.concat('posts?userId=', userID.toString(), '&_start=',start.toString(),'&_end=',end.toString());
        return this.httpClient.get<Post[]>(url).
            pipe(
                catchError(
                    this.handleError<Post[]>('getPostsOnlyOneUser', [])
                )
            );
    }
}


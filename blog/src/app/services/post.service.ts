import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { environment } from "src/environments/environment"
import { Post } from "../models/post.model"
import { catchError } from 'rxjs/operators';
import { BaseService } from "./base.service"

@Injectable({
    providedIn: "root"
})

export class PostService extends BaseService {

    constructor(readonly httpClient: HttpClient) {
        super()
    }

    getPosts(): Observable<Post[]> {
        const url = environment.Endpoint.concat('posts');
        return this.httpClient.get<Post[]>(environment.Endpoint.concat('posts'))
            .pipe(
                catchError(
                    this.handleError<Post[]>('getPosts', [])
                )
            );
    }

    getPost(postid: number): Observable<Post> {
        const url = environment.Endpoint.concat('posts/', postid.toString());
        return this.httpClient.get<Post>(url).
            pipe(
                catchError(
                    this.handleError<Post>('getPost', undefined)
                )
            );
    }

    updatePost(post: Post): Observable<Post>{
        const url = environment.Endpoint.concat('posts/', post.id.toString());
        return this.httpClient.put<Post>(url,post).
            pipe(
                catchError(
                    this.handleError<Post>('updatePost', undefined)
                )
            );
    }

    createPost(post: Post): Observable<Post>{
        const url = environment.Endpoint.concat('posts');
        return this.httpClient.post<Post>(url,post).
            pipe(
                catchError(
                    this.handleError<Post>('createPost', undefined)
                )
            );
    }

    deletePost(postid: number): Observable<Post>{
        const url = environment.Endpoint.concat('posts/', postid.toString());
        return this.httpClient.delete<Post>(url).
            pipe(
                catchError(
                    this.handleError<Post>('deletePost', undefined)
                )
            );
    }
}


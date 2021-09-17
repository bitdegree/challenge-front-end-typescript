import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { environment } from "src/environments/environment"
import { Post } from "../models/post.model"

@Injectable({
  providedIn: "root"
})

export class PostService {

    constructor(readonly httpClient : HttpClient){}

    getPosts() : Observable<Post[]>{
        return this.httpClient.get<Post[]>(environment.Endpoint.concat('posts')).pipe();
    }

    getPost(postid : number) : Observable<Post[]>{
        return this.httpClient.get<Post[]>(environment.Endpoint.concat('posts/',postid.toString())).pipe();
    }
}
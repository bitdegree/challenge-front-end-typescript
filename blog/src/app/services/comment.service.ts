import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { environment } from "src/environments/environment"
import { catchError } from 'rxjs/operators';
import { BaseService } from "./base.service"
import { PostComment } from "../models/comment.model";

@Injectable({
    providedIn: "root"
})

export class CommentService extends BaseService {

    constructor(readonly httpClient: HttpClient) {
        super()
    }

    getPostComments(postId : number): Observable<PostComment[]> {
        const url = environment.Endpoint.concat('comments?postId=',postId.toString());
        return this.httpClient.get<PostComment[]>(url)
        .pipe(
            catchError(
                this.handleError<PostComment[]>('getPostComments', [])
            )
        );
    }
}


import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { environment } from "src/environments/environment"
import { Post } from "../models/post.model"
import { catchError } from 'rxjs/operators';
import { BaseService } from "./base.service"
import { User } from "../models/user.model"

@Injectable({
    providedIn: "root"
})

export class UserService extends BaseService {

    constructor(readonly httpClient: HttpClient) {
        super()
    }

    getUsers(): Observable<User[]> {
        const url = environment.Endpoint.concat('users');
        return this.httpClient.get<User[]>(url)
        .pipe(
            catchError(
                this.handleError<User[]>('getUsers', [])
            )
        );
    }
}

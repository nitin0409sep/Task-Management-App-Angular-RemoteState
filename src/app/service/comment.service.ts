import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class CommentService {

    constructor(private http: HttpClient) { }

    // Get Task
    public getTaskDetails(id: number) {
        // this.http.get()
    }

}
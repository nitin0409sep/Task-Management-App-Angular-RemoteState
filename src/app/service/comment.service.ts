import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, combineLatest, map, Observable, switchMap, tap } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class CommentService {

    private apiUrl = 'http://localhost:80/api/data/todo/task';
    public refreshComment$$ = new BehaviorSubject<boolean>(false);

    constructor(
        private http: HttpClient,
        private activatedRoute: ActivatedRoute,
    ) { }

    // Get Task
    public getAllTaskComments(id?: number) {
        return combineLatest([
            this.activatedRoute.queryParams,
            this.refreshComment$$,
        ]).pipe(
            switchMap(([value]) => {

                // Params
                const params = { ...value };

                // Fetch Item Id
                const id = params['id'] ?? null;

                // Get Specific or ALl Items by URL
                const apiUrl =
                    id !== null
                        ? `${this.apiUrl}/view-list/${id}`
                        : `${this.apiUrl}/view-list`;

                // Remove from query params
                delete params['id'];

                return this.http.get<any>(`${apiUrl}`, { params }).pipe(
                    map((res) => res.data),
                ) as Observable<any>;
            })
        );
    }

    // Add Comment
    public addComment(reqbody: { comment: string }): Observable<any> {
        return this.http.post(`${this.apiUrl}/addComment`, reqbody).pipe(
            map((res) => {
                return res;
            }),
            tap(() => {
                this.refreshComment$$.next(true);
            })
        ) as Observable<any>;
    }

    // Update Comment
    public updateComment(id: number, reqbody: string): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/updateComment/${id}`, reqbody).pipe(
            map((res) => {
                return res.message;
            }),
            tap(() => {
                this.refreshComment$$.next(true);
            })
        ) as Observable<any>;
    }

    // Delete Comment
    public deleteComment(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/deleteComment/${id}`).pipe(
            map((res) => {
                return res.message;
            }),
            tap(() => {
                this.refreshComment$$.next(true);
            })
        ) as Observable<any>;
    }


    // Delete All Comments
    public deleteAllComments(): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/deleteAllComments`).pipe(
            map((res) => {
                return res.message;
            }),
            tap(() => {
                this.refreshComment$$.next(true);
            })
        ) as Observable<any>;
    }

}
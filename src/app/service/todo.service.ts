import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  switchMap,
  tap,
} from 'rxjs';

import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'http://localhost:80/api/data';

  public refreshList$$ = new BehaviorSubject<boolean>(false);
  public loading$$ = new BehaviorSubject<boolean>(false);

  public constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}

  // Reference Loader
  public setRefreshLoader(loading$$: BehaviorSubject<boolean>): void {
    this.loading$$ = loading$$;
  }

  // Get Items
  public getData(): Observable<any> {
    return combineLatest([
      this.activatedRoute.queryParams,
      this.refreshList$$,
    ]).pipe(
      switchMap(([value]) => {
        this.loading$$.next(true);

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
          tap(() => {
            this.loading$$.next(false);
          })
        ) as Observable<any>;
      })
    );
  }

  // Add Items
  public addItems(reqbody: { value: string[] }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addItem`, reqbody).pipe(
      map((res) => {
        return res.message;
      }),
      tap(() => {
        this.refreshList$$.next(true);
      })
    ) as Observable<any>;
  }

  // Update Items
  public updateItems(id: number, reqbody: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updateItem/${id}`, reqbody).pipe(
      map((res) => {
        return res.message;
      }),
      tap(() => {
        this.refreshList$$.next(true);
      })
    ) as Observable<any>;
  }

  // Delete Items
  public delteItems(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleteItem/${id}`).pipe(
      map((res) => {
        return res.message;
      }),
      tap(() => {
        this.refreshList$$.next(true);
      })
    ) as Observable<any>;
  }
}

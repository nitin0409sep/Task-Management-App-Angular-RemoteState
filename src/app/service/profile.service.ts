import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = 'http://localhost:80/api/data/profile';

  private constructor(private http: HttpClient) {}

  public getProfile(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((res) => {
        return res.profileData;
      })
    ) as Observable<any>;
  }
}

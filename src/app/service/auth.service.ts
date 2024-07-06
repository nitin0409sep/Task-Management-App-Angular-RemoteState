import { HttpBackend, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, tap, throttleTime } from "rxjs";
import { AuthLogin } from "../models/auth.modal";
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable({
    providedIn: "root"
})
export class AuthService {
    public isLoggedIn$$!: BehaviorSubject<boolean>;
    public isLoggedIn$!: Observable<boolean>;
    private httpClientNoInterceptors: HttpClient;
    private apiUrl = 'http://localhost:80/api/data/auth';
 
    constructor(
        private httpBackend:HttpBackend
    ){
    this.httpClientNoInterceptors = new HttpClient(this.httpBackend); 

    this.isLoggedIn$$ = new BehaviorSubject(this.checkIfLoggedIn());
    this.isLoggedIn$ = this.isLoggedIn$$.asObservable().pipe(throttleTime(1000))
    }

    public userLogin(reqBody:AuthLogin): Observable<any>{
        return this.httpClientNoInterceptors.post<any>(`${this.apiUrl}/login`, reqBody)
        .pipe(
            map((res) => {res.data}),
            tap(() => {
                this.isLoggedIn$$.next(true);
            })
        )as Observable<any>;
    }

    public checkIfLoggedIn(): boolean {
        return Cookie.get('refresh_token') ? true : false;
    }

    public getSavedToken(): string {
        return Cookie.get('refresh_token');
    }

    public logoutUser(){
        Cookie.delete('id_token');
    }

}
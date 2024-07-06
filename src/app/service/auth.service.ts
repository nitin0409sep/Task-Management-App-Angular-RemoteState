import { HttpBackend, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, tap, throttleTime } from "rxjs";
import { AuthLogin } from "../modals/auth.modal";
// import { Cookie } from 'ng2-cookies/ng2-cookies';
import { LocalStorageKey, LocalStorageService } from "../utils/shared-service/localstorage.service";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    public isLoggedIn$$!: BehaviorSubject<boolean>;
    public isLoggedIn$!: Observable<boolean>;
    private httpClientNoInterceptors: HttpClient;
    private apiUrl = 'http://localhost:80/api/data/auth';

    constructor(
        private httpBackend: HttpBackend,
        private localstorageservice: LocalStorageService,
        private router: Router,
    ) {
        this.httpClientNoInterceptors = new HttpClient(this.httpBackend);

        this.isLoggedIn$$ = new BehaviorSubject(this.checkIfLoggedIn());
        this.isLoggedIn$ = this.isLoggedIn$$.asObservable().pipe(throttleTime(1000))
    }

    public userLogin$(reqBody: AuthLogin): Observable<any> {
        return this.httpClientNoInterceptors.post<any>(`${this.apiUrl}/login`, reqBody)
            .pipe(
                map((res) => { return res }),
                tap((data) => {
                    this.saveToLocalStorage(data.token);
                    this.isLoggedIn$$.next(true);
                })
            ) as Observable<any>;
    }

    public checkIfLoggedIn(): boolean {
        return !!this.getSavedToken();
        // return Cookie.get('refresh_token') ? true : false;
    }

    // public getSavedToken(): string {
    //     return Cookie.get('refresh_token');
    // }

    public getSavedToken(): string {
        return this.localstorageservice.get(LocalStorageKey.token);
    }

    private saveToLocalStorage(data: string) {
        this.localstorageservice.set(LocalStorageKey.token, data);
    }

    public logoutUser() {
        this.isLoggedIn$$.next(false);
        this.localstorageservice.remove(LocalStorageKey.token);
        this.router.navigate(['/auth/login']);
    }
}
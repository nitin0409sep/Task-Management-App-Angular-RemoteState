import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, switchMap, take } from "rxjs";
import { AuthService } from "src/app/service/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
        constructor(
        private authService:AuthService,
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return this.authService.isLoggedIn$.pipe(
            take(1),
            switchMap(() => {
                const token = this.authService.getSavedToken();
                // Setting Header/Token in Every Req
                req = req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return next.handle(req);
            })
        )
    }
}
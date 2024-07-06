import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';
import { SnackBarService } from 'src/app/utils/shared-service/snackbar.service';

enum ErrorMessage {
    Unauthorized = 'You are not Authorized to Perform this Action!',
    ValidationFailed = 'Validation Failed!',
    NoInternet = 'No Internet Connection Found!',
    PageNotFound = 'Page Not Found',
    Other = 'Something went Wrong, Please try again later!',
}

enum RequestMethods {
    GET = 'GET',
    POST = 'POST',
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private snackBar: SnackBarService, private authService: AuthService) { }

    public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error) => {
                if (error.status === 401) {
                    this.authService.logoutUser();
                } else if (error.status === 403) {
                    this.snackBar.showError(ErrorMessage.Unauthorized);
                } else if (error.status === 409) {
                    this.snackBar.showError(error?.error?.status);
                }

                if ([403, 409].indexOf(error.status) === -1) {
                    const err = error?.error?.error;
                    let errorMessage: string = err?.message ? err?.message : err;
                    if (Object.prototype.toString.call(errorMessage) !== '[object String]') {
                        errorMessage = err?.name;
                    }

                    errorMessage = errorMessage ? errorMessage + '!' : errorMessage;

                    if (error.status === 400 && err?.details?.body?.length) {
                        for (const e of err.details.body) {
                            errorMessage += ` ${e.message}`;
                        }
                    }
                    this.snackBar.showError(errorMessage);
                }

                if (request.method === RequestMethods.GET) {
                    return of(
                        new HttpResponse({
                            body: {
                                data: [],
                            },
                        }),
                    );
                }

                return throwError(() => new Error(error));
            }),
        );
    }
}

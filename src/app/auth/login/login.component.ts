import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, take } from 'rxjs';
import { AuthLogin } from 'src/app/modals/auth.modal';
import { AuthService } from 'src/app/service/auth.service';
import { SnackBarService } from 'src/app/utils/shared-service/snackbar.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [],
})
export class LoginComponent {
  // Loader's
  public loading$$ = new BehaviorSubject<boolean>(false);
  public isLoggedIn$$ = new BehaviorSubject(false);

  // Login Form
  public loginForm!: FormGroup<{
    username: FormControl<string>;
    password: FormControl<string>;
  }>;

  public constructor(
    private authService: AuthService,
    private snackbarserviceService: SnackBarService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    // super();
    this.checkIfLoggedIn();
  }

  public ngOnInit() {
    this.createFrom();
  }

  public createFrom() {
    this.loginForm = new FormGroup<{
      username: FormControl<string>;
      password: FormControl<string>;
    }>({
      username: new FormControl('', { validators: [Validators.required], nonNullable: true }),
      password: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    });
  }

  // public override ngOnDestroy() {
  //   super.ngOnDestroy();
  // }

  public loginWithUsernameAndPassword() {
    if (this.loginForm.invalid) {
      this.snackbarserviceService.showError('Invalid form, please try again.');
      return;
    }
    this.loading$$.next(true);
    const { username, password } = this.loginForm.value;
    const requestBody = {
      email: username?.toLocaleLowerCase(),
      password: password,
    } as AuthLogin;

    this.authService
      .userLogin$(requestBody)
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          this.loading$$.next(false);
          this.checkIfLoggedIn();
        },
        error: (error) => {
          this.loading$$.next(false);
          this.snackbarserviceService.showError(error.error.error);
        },
      });

    this.activatedRoute.queryParams.pipe(take(1)).subscribe((value) => {
      const { redirectTo } = value;
      this.router.navigate([redirectTo ? redirectTo : '']);
    });
  }

  public checkIfLoggedIn() {
    this.authService.isLoggedIn$.pipe(take(1)).subscribe((isLoggedIn) => {
      console.log('is logged in', isLoggedIn);
      if (isLoggedIn) {
        this.router.navigate(['/view-list']);
      } else {
        this.isLoggedIn$$.next(false);
      }
    });
  }

  public openForgotPasswordDialog() {}
}

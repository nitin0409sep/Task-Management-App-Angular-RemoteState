import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { BehaviorSubject, take } from "rxjs";
import { RegisterUser } from "src/app/modals/auth.modal";
import { AuthService } from "src/app/service/auth.service";
import { SnackBarService } from "src/app/utils/shared-service/snackbar.service";

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
    // Loader's
    public loading$$ = new BehaviorSubject<boolean>(false);
    public isLoggedIn$$ = new BehaviorSubject(false);

    // Login Form
    public registerForm!: FormGroup<{
        username: FormControl<string>;
        email: FormControl<string>;
        password: FormControl<string>;
        confirmPassword: FormControl<string>;
    }>;

    public constructor(
        private authService: AuthService,
        private snackbarserviceService: SnackBarService,
        private router: Router,
    ) {
        this.checkIfLoggedIn();
    }

    public ngOnInit() {
        this.createFrom();
    }

    public createFrom() {
        this.registerForm = new FormGroup<{
            username: FormControl<string>;
            email: FormControl<string>;
            password: FormControl<string>;
            confirmPassword: FormControl<string>;
        }>({
            username: new FormControl('', { validators: [Validators.required], nonNullable: true }),
            email: new FormControl('', { validators: [Validators.required], nonNullable: true }),
            password: new FormControl('', { validators: [Validators.required], nonNullable: true }),
            confirmPassword: new FormControl('', { validators: [Validators.required], nonNullable: true }),
        });
    }

    // public override ngOnDestroy() {
    //   super.ngOnDestroy();
    // }

    public registerUser() {
        // Form Invalid
        if (!this.registerForm.valid) {
            this.snackbarserviceService.showError("Form is Invalid.");
            return;
        }

        // Matching Password and Confirm Password 
        if (this.registerForm.get('password')!.value !== this.registerForm.get('confirmPassword')!.value) {
            this.registerForm.get('confirmPassword')?.reset();
            this.snackbarserviceService.showError("Password and Confirm Password doesn't match.");
            return;
        }

        // Request Body
        const reqBody: RegisterUser = {
            user_name: this.registerForm.get('username')!.value,
            email: this.registerForm.get('email')!.value,
            password: this.registerForm.get('password')!.value
        }

        // Register API
        this.loading$$.next(true);
        this.authService.registerUser$(reqBody).subscribe({
            next: (val) => {
                if (val) {
                    this.loading$$.next(false);
                    this.snackbarserviceService.showMessage("User Registered Successfully.");
                    this.router.navigate(['/view-list']);
                } else {
                    this.loading$$.next(false);
                    this.snackbarserviceService.showError("User is not Registered.");
                }
            },
            error: (err) => {
                this.loading$$.next(false);
                this.snackbarserviceService.showError(err.error.error);
            }
        })
    }


    public checkIfLoggedIn() {
        this.authService.isLoggedIn$.pipe(take(1)).subscribe((isLoggedIn) => {
            if (isLoggedIn) {
                this.router.navigate(['/view-list']);
            } else {
                this.isLoggedIn$$.next(false);
            }
        });
    }

    public openForgotPasswordDialog() { }

}
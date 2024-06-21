import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  private defaultError = 'Something went wrong, please try again later';

  constructor(private matSnackBar: MatSnackBar) {}

  public showMessage(message: string): void {
    this.matSnackBar.open(`${message}`, '', { duration: 3000 });
  }

  public showError(message = this.defaultError, time?: number): void {
    this.matSnackBar.open(message, '', {
      panelClass: ['mat-toolbar'],
      duration: time ? time : 2000,
    });
  }
}

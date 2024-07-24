import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { ProfileService } from 'src/app/service/profile.service';
import { ConfirmationDialogComponent } from 'src/app/utils/shared-componets/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [],
})
export class HeaderComponent {

  public username!: string;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private profileService: ProfileService,
  ) { }

  ngOnInit() {
    this.getProfileData();
  }

  public getProfileData() {
    this.profileService
      .getProfile()
      .pipe(take(1))
      .subscribe((val) => {
        this.username = val?.user_name ?? '';
      });
  }

  public logoutUser() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: "Do you want to logout ?",
      }
    });

    dialogRef.afterClosed().subscribe((val) => {
      if (val) {
        this.authService.logoutUser();
      }
    })
  }
}

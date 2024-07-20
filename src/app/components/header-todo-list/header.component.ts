import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth.service';
import { ConfirmationDialogComponent } from 'src/app/utils/shared-componets/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [],
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() { }

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

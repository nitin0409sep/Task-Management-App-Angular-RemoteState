import { Component } from '@angular/core';
import { take } from 'rxjs';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: [],
})
export class ProfileComponent {
  public constructor(private profileService: ProfileService) {}

  public getProfileData() {
    this.profileService
      .getProfile()
      .pipe(take(1))
      .subscribe((val) => {
        console.log(val);
      });
  }
}

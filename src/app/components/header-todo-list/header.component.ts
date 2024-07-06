import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [],
})
export class HeaderComponent {

  constructor(
    private authService:AuthService,
  ){}

  ngOnInit(){}

  public logoutUser(){
    this.authService.logoutUser();
  }
}

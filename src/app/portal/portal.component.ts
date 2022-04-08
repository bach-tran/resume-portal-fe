import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserInfo } from '../UserInfo';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {

  userInfo!: UserInfo;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe(res => {
      if (res.status === 200) {
        this.userInfo = res.body!;
      }
    });
  }

}

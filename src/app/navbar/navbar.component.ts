import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  displayLoginRegister: boolean = !localStorage.getItem('jwt');

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.authSuccess.subscribe(() => {
      this.displayLoginRegister = false;
    });

    this.authService.authLogout.subscribe(() => {
      this.displayLoginRegister = true;
    });
  }

  logout() {
    this.authService.logout();
  }

}

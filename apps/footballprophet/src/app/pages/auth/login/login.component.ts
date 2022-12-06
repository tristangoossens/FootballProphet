import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Identity } from '@footballprophet/domain';
import { AlertService } from '../../../common/alert.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'footballprophet-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userData!: Identity;

  constructor(
    private authService: AuthService,
    private router: Router
  ) 
  {}

  ngOnInit(): void {
    this.userData = {
      username: '',
      password: '',
    };
  }

  login() {
    this.authService.login(this.userData)
      .subscribe({
        next: (_) => {
          this.router.navigate(['/']);
          AlertService.alertSuccess('Je bent succesvol ingelogd!');
        },
        error: (e) => {
          AlertService.alertError(e.error.message);
        }
    });
  }
}

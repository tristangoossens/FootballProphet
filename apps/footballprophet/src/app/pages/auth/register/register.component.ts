import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserRole } from '@footballprophet/domain';
import { AlertService } from '../../../common/alert.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'footballprophet-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  newUser!: User
  isPasswordVisible = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.newUser = {
      _id: undefined,
      username: '',
      password: '',
      birthDate: new Date(),
      phonenumber: '',
      roles: [UserRole.User],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  }

  register() {
    this.authService.register(this.newUser)
      .subscribe({
        next: (msg) => {
          this.router.navigate(['/login']);
          AlertService.alertSuccess(msg || 'Registratie is successvol');
        },
        error: (e) => {
          AlertService.alertError(e.error.message);
        }
      });
  }

}

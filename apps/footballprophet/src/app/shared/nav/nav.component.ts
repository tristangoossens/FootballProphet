import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../auth/auth.service';
import { LoginComponent } from '../../auth/login/login-dialog.component';
import { RegisterComponent } from '../../auth/register/register-dialog.component';

@Component({
  selector: 'footballprophet-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  constructor(public authService: AuthService, public dialog: MatDialog) {}

  openLoginDialog() {
    this.dialog.open(LoginComponent, { restoreFocus: false });
  }

  openRegisterDialog() {
    this.dialog.open(RegisterComponent, { restoreFocus: false });
  }
}

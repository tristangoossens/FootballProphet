import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Identity } from '@footballprophet/domain';
import { AlertService } from '../../shared/alert/alert.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'footballprophet-login',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginComponent {
  public loginForm: FormGroup = new FormGroup({});
  public hidePassword: boolean = true;
  public loading: boolean = false;
  public model: Identity = {
    username: '',
    password: '',
  };

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    private authService: AuthService,
    private fb: FormBuilder,
    private alertService: AlertService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]],
    });
  }

  login() {
    this.loading = true;
    setTimeout(() => {
      this.authService.login(this.model).subscribe({
        next: (_) => {
          this.dialogRef.close();
          this.loading = false;
          this.alertService.AlertSuccess('Login successful');
        },
        error: (e) => {
          this.loading = false;
          this.alertService.AlertError(e.error.message);
        },
      });
    }, 400);
  }
}

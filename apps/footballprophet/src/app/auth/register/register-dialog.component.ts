import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '@footballprophet/domain';
import { AlertService } from '../../shared/alert/alert.service';
import { AuthService } from '../auth.service';
import { LoginComponent } from '../login/login-dialog.component';

@Component({
  selector: 'footballprophet-register',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss'],
})
export class RegisterComponent {
  public personalInfoForm: FormGroup = new FormGroup({});
  public credentialsForm: FormGroup = new FormGroup({});
  public hidePassword: boolean = true;
  public loading: boolean = false;
  public model: User = {
    username: '',
    password: '',
    birthDate: new Date(),
    phonenumber: '',
    avatarUrl: '',

    roles: [],
  };

  constructor(
    public registerDialogRef: MatDialogRef<RegisterComponent>,
    public loginDialogRef: MatDialogRef<LoginComponent>,
    private authService: AuthService,
    private fb: FormBuilder,
    private alertService: AlertService
  ) {
    this.personalInfoForm = this.fb.group({
      birthDate: ['', Validators.required],
      phonenumber: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/
          ),
        ],
      ],
      avatarUrl: ['', Validators.required],
    });

    this.credentialsForm = this.fb.group({
      username: ['', Validators.required], // TODO: add minimum length validator
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
          ),
        ],
      ],
    });
  }

  register() {
    this.loading = true;

    this.authService.register(this.model).subscribe(
      (message) => {
        this.loading = false;
        this.registerDialogRef.close();

        this.alertService.AlertSuccess(message as string);
      },
      (err) => {
        this.alertService.AlertError(err.error.message);
        this.loading = false;
      }
    );
  }
}

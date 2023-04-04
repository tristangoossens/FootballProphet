import { Injectable } from '@angular/core';
import { SuccessComponent } from './success/success.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorComponent } from './error/error.component';

@Injectable()
export class AlertService {
  constructor(private snackBar: MatSnackBar) {}

  public AlertSuccess(message: string): void {
    this.snackBar.openFromComponent(SuccessComponent, {
      duration: 3000,
      data: message,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  public AlertError(message: string): void {
    this.snackBar.openFromComponent(ErrorComponent, {
      duration: 3000,
      data: message,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }
}

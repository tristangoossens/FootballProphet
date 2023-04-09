import { Component, Inject } from '@angular/core';
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';

@Component({
  selector: 'footballprophet-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<ErrorComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {}
}

import { Component, Inject } from '@angular/core';
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';

@Component({
  selector: 'footballprophet-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss'],
})
export class SuccessComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<SuccessComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {}
}

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'footballprophet-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      method: string;
      title: string;
      message: string;
      imageUrl?: string;
    }
  ) {}

  public CloseDialog(): void {
    this.dialogRef.close(false);
  }

  public Confirm(): void {
    this.dialogRef.close(true);
  }
}

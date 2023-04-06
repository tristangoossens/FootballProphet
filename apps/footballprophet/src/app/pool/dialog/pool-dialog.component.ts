import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PoolService } from '../pool.service';
import { Pool } from '@footballprophet/domain';

@Component({
  selector: 'footballprophet-pool-dialog',
  templateUrl: './pool-dialog.component.html',
  styleUrls: ['./pool-dialog.component.scss'],
})
export class PoolDialogComponent {
  public poolForm: FormGroup = new FormGroup({});

  constructor(
    public dialogRef: MatDialogRef<PoolDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Pool,
    private fb: FormBuilder,
    private poolService: PoolService
  ) {
    this.poolForm = this.fb.group({
      name: ['', Validators.required],
      logoUrl: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });

    if (data) {
      this.poolForm.setValue({
        name: data.name,
        logoUrl: data.logoUrl,
        description: data.description,
      });
    }
  }

  public Submit(): void {
    this.dialogRef.close(true);
  }

  public CloseDialog(): void {
    this.dialogRef.close(false);
  }
}

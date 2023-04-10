import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Pool, User } from '@footballprophet/domain';
import { AuthService } from '../auth/auth.service';
import { AlertService } from '../shared/alert/alert.service';
import { PoolDialogComponent } from './dialog/pool-dialog.component';
import { PoolService } from './pool.service';

@Component({
  selector: 'footballprophet-pool',
  templateUrl: './pool.component.html',
  styleUrls: ['./pool.component.scss'],
})
export class PoolComponent implements OnInit {
  public loggedInUser?: User;
  public pools: Pool[] = [];
  public isLoading: boolean = false;

  // Page
  public pageSize: number = 10;
  public currentPage: number = 0;

  constructor(
    private poolService: PoolService,
    private dialog: MatDialog,
    private alertService: AlertService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.loggedInUser = user;
    });

    this.LoadPools();
  }

  NextPage(): void {
    this.currentPage++;
    this.LoadPools();
  }

  LoadPools() {
    this.isLoading = true;
    this.poolService
      .GetPools(this.currentPage * this.pageSize, this.pageSize)
      .subscribe(
        (pools) => {
          this.pools = [...this.pools, ...pools];
          this.isLoading = false;
        },
        (error) => {
          this.alertService.AlertError(error.message);
          this.isLoading = false;
        }
      );
  }

  public OpenPoolCreateDialog(): void {
    const dialogRef = this.dialog.open(PoolDialogComponent, {
      data: {
        user: this.loggedInUser,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.poolService.CreatePool(result).subscribe(
          (_) => {
            this.alertService.AlertSuccess('Pool created successfully');
            this.LoadPools();
          },
          (error) => {
            this.alertService.AlertError(error.message);
          }
        );
      }
    });
  }
}

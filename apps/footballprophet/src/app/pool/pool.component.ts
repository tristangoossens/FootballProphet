import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Pool } from '@footballprophet/domain';
import { PoolService } from './pool.service';

@Component({
    selector: 'footballprophet-pool',
    templateUrl: './pool.component.html',
    styleUrls: ['./pool.component.scss'],
})
export class PoolComponent implements OnInit {
    public pools: Pool[] = [];
    public isLoading: boolean = false;

    constructor(private poolService: PoolService) { }

    ngOnInit(): void {
        this.LoadPools();
    }

    LoadPools(offset: number = 0, limit: number = 10) {
        this.isLoading = true;
        // Set a timeout to simulate a slow connection
        setTimeout(() => {
            this.poolService.GetPools(offset, limit).subscribe((pools) => {
                this.pools = pools;
                this.isLoading = false;
            });
        }, 1000);
    }
}

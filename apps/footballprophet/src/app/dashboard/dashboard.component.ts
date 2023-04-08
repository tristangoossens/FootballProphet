import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'footballprophet-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit(): void {
        this.authService.currentUser$.subscribe((user) => {
            if (!user) this.router.navigate(['/']);
        });
    }
}

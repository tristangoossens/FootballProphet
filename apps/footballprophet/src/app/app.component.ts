import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'footballprophet-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'footballprophet';

  constructor(private authService: AuthService) {}
}

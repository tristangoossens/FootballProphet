import { Component, OnInit } from '@angular/core';
import { User } from '@footballprophet/domain';
import { Observable } from 'rxjs';
import { AuthService } from '../../pages/auth/auth.service';

@Component({
  selector: 'footballprophet-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  public isMenuCollapsed = true;

  constructor(public authService: AuthService) {}
}

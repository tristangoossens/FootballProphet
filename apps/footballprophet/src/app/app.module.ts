import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NavComponent } from './shared/nav/nav.component';
import { MatMenuModule } from '@angular/material/menu';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './auth/auth.service';
import { LoginComponent } from './auth/login/login-dialog.component';
import { AppRoutingModule } from './app.routes';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { RegisterComponent } from './auth/register/register-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SuccessComponent } from './shared/alert/success/success.component';
import { ErrorComponent } from './shared/alert/error/error.component';
import { AlertService } from './shared/alert/alert.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { LeagueComponent } from './league/league.component';
import { LeagueService } from './league/league.service';
import { PoolService } from './pool/pool.service';
import { InviteResolver } from './pool/invite/invite.resolver';
import { PoolComponent } from './pool/pool.component';
import { PoolDetailComponent } from './pool/details/pool-details.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { DialogComponent } from './shared/dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    SuccessComponent,
    ErrorComponent,
    LeagueComponent,
    PoolComponent,
    PoolDetailComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    // Angular Material
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatProgressBarModule,
    MatDialogModule,
    MatStepperModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatGridListModule,
    MatCardModule,
    MatTabsModule,
    MatTableModule,

    // Forms
    FormsModule,
    ReactiveFormsModule,

    // Bootstrap
    NgbModule,
  ],
  providers: [
    AuthService,
    AlertService,
    LeagueService,
    PoolService,
    InviteResolver,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

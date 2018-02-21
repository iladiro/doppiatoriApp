import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './components/user/_helpers/index';

// Services
import { DubberService } from './components/dubber/_services/dubbers.service';
import { FilmService } from './components/film/_services/index';
import { InvoiceService } from './components/dubber/_services/invoices.service';
import { AlertService, AuthenticationService, UserService } from './components/user/_services/index';
import { AuthGuard } from './components/user/_guards/index';
import { JwtInterceptor } from './components/user/_helpers/index';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { DubbersListComponent } from './components/dubber/dubbers-list/dubbers-list.component';
import { DubberProfileComponent } from './components/dubber/dubber-profile/dubber-profile.component';
import { AddDubberComponent } from './components/dubber/add-dubber/add-dubber.component';
import { HeaderComponent } from './components/template/header/header.component';
import { FilmListComponent } from './components/film/film-list/film-list.component';
import { AddFilmComponent } from './components/film/add-film/add-film.component';
import { FilmDetailsComponent } from './components/film/film-details/film-details.component';
import { PageNotFoundComponent } from './components/widgets/page-not-found/page-not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DubberInvoiceComponent } from './components/dubber/dubber-invoice/dubber-invoice.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { AlertComponent } from './components/user/_directives/alert/alert.component';
import { ListComponent } from './components/user/list/list.component';
import { AlertMessageComponent } from './components/widgets/alert-message/alert-message.component';

@NgModule({
  declarations: [
    AppComponent,
    DubbersListComponent,
    DubberProfileComponent,
    AddDubberComponent,
    HeaderComponent,
    FilmListComponent,
    AddFilmComponent,
    FilmDetailsComponent,
    PageNotFoundComponent,
    DashboardComponent,
    DubberInvoiceComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    ListComponent,
    AlertMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,  // Add this!
    HttpClientModule
  ],
  providers: [
    DubberService,
    FilmService,
    InvoiceService,
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

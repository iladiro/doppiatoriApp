import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Services
import { DubberService } from './components/dubber/dubbers.service';
import { AccountService } from './components/account/accounts.service';
import { FilmService } from './components/film/film.service';
import { InvoiceService } from './components/dubber/invoices.service';
import { UserService } from './components/user/user.service';

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
import { NewAccountComponent } from './components/account/new-account/new-account.component';
import { AccountsListComponent } from './components/account/accounts-list/accounts-list.component';
import { AccountDetailsComponent } from './components/account/account-details/account-details.component';
import { DubberInvoiceComponent } from './components/dubber/dubber-invoice/dubber-invoice.component';
import { SigninComponent } from './components/user/signin/signin.component';
import { AuthguardGuard } from './components/user/authguard.guard';

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
    NewAccountComponent,
    AccountsListComponent,
    AccountDetailsComponent,
    DubberInvoiceComponent,
    SigninComponent
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
    AccountService,
    FilmService,
    InvoiceService,
    UserService,
    AuthguardGuard
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

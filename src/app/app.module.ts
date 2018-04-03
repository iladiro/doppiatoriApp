import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Services
import { DubberService } from './components/dubber/_services/dubbers.service';
import { FilmService } from './components/film/_services/index';
import { CompanyService } from './components/company/_services/index';
import { InvoiceService } from './components/invoice/_services/index';
import { PagerService } from './components/widgets/paginator/_services/index';
import { UserService } from './components/user/_services/index';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';

import { DubbersListComponent } from './components/dubber/list/list.component';
import { DubberProfileComponent } from './components/dubber/details/details.component';
import { AddDubberComponent } from './components/dubber/create/create.component';

import { CompanyCreateComponent } from './components/company/create/create.component';
import { CompanyListComponent } from './components/company/list/list.component';
import { CompanyDetailsComponent } from './components/company/details/details.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/template/header/header.component';
import { SidebarComponent } from './components/template/sidebar/sidebar.component';

import { FilmListComponent } from './components/film/list/list.component';
import { AddFilmComponent } from './components/film/create/create.component';
import { FilmDetailsComponent } from './components/film/details/details.component';

import { RegisterComponent } from './components/user/register/register.component';
import { UsersListComponent } from './components/user/list/list.component';
import { DetailsUserComponent } from './components/user/details/details.component';

import { CreateComponent } from './components/invoice/create/create.component';
import { DetailsInvoiceComponent } from './components/invoice/details/details.component';
import { InvoiceListComponent } from './components/invoice/list/list.component';

import { AlertMessageComponent } from './components/widgets/alert-message/alert-message.component';
import { SearchFormComponent } from './components/widgets/search-form/search-form.component';
import { PaginatorComponent } from './components/widgets/paginator/paginator.component';
import { ModalPromptComponent } from './components/widgets/modal-prompt/modal-prompt.component';
import { PageNotFoundComponent } from './components/widgets/page-not-found/page-not-found.component';
import { EditFormComponent } from './components/dubber/details/edit-form/edit-form.component';
import { BackButtonComponent } from './components/widgets/back-button/back-button.component';

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
    RegisterComponent,
    UsersListComponent,
    AlertMessageComponent,
    SearchFormComponent,
    DetailsUserComponent,
    DetailsInvoiceComponent,
    CreateComponent,
    InvoiceListComponent,
    PaginatorComponent,
    ModalPromptComponent,
    EditFormComponent,
    BackButtonComponent,
    CompanyCreateComponent,
    CompanyListComponent,
    CompanyDetailsComponent,
    SidebarComponent
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
    UserService,
    PagerService,
    CompanyService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

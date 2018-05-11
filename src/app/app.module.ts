import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Services
import { Service } from './services/http.service';
import { DubberService } from './components/dubber/_services/dubbers.service';
import { FilmService } from './components/film/_services/index';
import { InvoiceService } from './components/dubber/details/invoice/_services/index';
import { PagerService } from './components/widgets/paginator/_services/index';
import { UserService } from './components/user/_services/index';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';

import { DubbersListComponent } from './components/dubber/list/list.component';
import { DubberProfileComponent } from './components/dubber/details/details.component';
import { AddDubberComponent } from './components/dubber/create/create.component';
import { DubberPersonalInformationComponent } from './components/dubber/details/personal-information/personal-information.component';
import { BankCreateComponent } from './components/dubber/details/banks/create/create.component';
import { BanksListComponent } from './components/dubber/details/banks/list/list.component';
import { DubberTaxInformationComponent } from './components/dubber/details/tax-information/tax-information.component';
import { InvoiceCreateComponent } from './components/dubber/details/invoice/create/create.component';
import { DetailsInvoiceComponent } from './components/dubber/details/invoice/details/details.component';
import { InvoiceListComponent } from './components/dubber/details/invoice/list/list.component';
import { DubberArchivedComponent } from './components/dubber/archived/archived.component';

import { CompanyCreateComponent } from './components/settings/company/create/create.component';
import { CompanyListComponent } from './components/settings/company/list/list.component';
import { CompanyDetailsComponent } from './components/settings/company/details/details.component';
import { QualificationCreateComponent } from './components/settings/qualification/create/create.component';
import { QualificationListComponent } from './components/settings/qualification/list/list.component';
import { QualificationDetailsComponent } from './components/settings/qualification/details/details.component';
import { EnpalsParametersListComponent } from './components/settings/enpals-parameters/list/list.component';
import { EnpalsParameterDetailsComponent } from './components/settings/enpals-parameters/details/details.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/template/header/header.component';
import { SidebarComponent } from './components/template/sidebar/sidebar.component';

import { FilmListComponent } from './components/film/list/list.component';
import { AddFilmComponent } from './components/film/create/create.component';
import { FilmDetailsComponent } from './components/film/details/details.component';

import { RegisterComponent } from './components/user/register/register.component';
import { UsersListComponent } from './components/user/list/list.component';
import { DetailsUserComponent } from './components/user/details/details.component';

import { AlertMessageComponent } from './components/widgets/alert-message/alert-message.component';
import { SearchFormComponent } from './components/widgets/search-form/search-form.component';
import { PaginatorComponent } from './components/widgets/paginator/paginator.component';
import { ModalPromptComponent } from './components/widgets/modal-prompt/modal-prompt.component';
import { PageNotFoundComponent } from './components/widgets/page-not-found/page-not-found.component';
import { BackButtonComponent } from './components/widgets/back-button/back-button.component';
import { DubberFilmsComponent } from './components/dubber/details/films/films.component';

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
    InvoiceCreateComponent,
    InvoiceListComponent,
    PaginatorComponent,
    ModalPromptComponent,
    DubberPersonalInformationComponent,
    BackButtonComponent,
    CompanyCreateComponent,
    CompanyListComponent,
    CompanyDetailsComponent,
    SidebarComponent,
    QualificationCreateComponent,
    QualificationListComponent,
    QualificationDetailsComponent,
    BankCreateComponent,
    BanksListComponent,
    DubberTaxInformationComponent,
    EnpalsParametersListComponent,
    EnpalsParameterDetailsComponent,
    DubberFilmsComponent,
    DubberArchivedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,  // Add this!
    HttpClientModule
  ],
  providers: [
    Service,
    DubberService,
    FilmService,
    InvoiceService,
    UserService,
    PagerService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

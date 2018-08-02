import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';

// Services
import { Service } from './services/http.service';
import { DubberService } from './components/dubber/_services/dubbers.service';
import { FilmService } from './components/film/_services/index';
import { InvoiceService } from './components/dubber/details/invoice/_services/index';
import { PagerService } from './components/widgets/paginator/_services/index';
import { UserService } from './components/user/_services/index';
import { EnpalsPaymentsService } from './components/enapls_payments/_services/index';

// Helpers
import { PrintYears } from './helpers/print-years';
import { LoadAllItems } from './helpers/load-all-items';

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
import { DubberFilmsComponent } from './components/dubber/details/films/films.component';

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
import { FilmMainInformationsComponent } from './components/film/details/main-informations/main-informations.component';
import { FilmDubbersListComponent } from './components/film/details/dubbers/list/list.component';
import { AddFilmDubberComponent } from './components/film/details/dubbers/create/create.component';

import { RegisterComponent } from './components/user/register/register.component';
import { UsersListComponent } from './components/user/list/list.component';
import { DetailsUserComponent } from './components/user/details/details.component';

import { AlertMessageComponent } from './components/widgets/alert-message/alert-message.component';
import { SearchFormComponent } from './components/widgets/search-form/search-form.component';
import { PaginatorComponent } from './components/widgets/paginator/paginator.component';
import { ModalPromptComponent } from './components/widgets/modal-prompt/modal-prompt.component';
import { PageNotFoundComponent } from './components/widgets/page-not-found/page-not-found.component';
import { BackButtonComponent } from './components/widgets/back-button/back-button.component';

import { EnpalsPaymentsCreateComponent } from './components/enapls_payments/create/create.component';
import { EnpalsPaymentsListComponent } from './components/enapls_payments/list/list.component';
import { TableRowEnpalsPaymentsComponent } from './components/enapls_payments/list/viewchild/table-row.component';
import { ChartEnpalsPaymentsComponent } from './components/enapls_payments/report/chart-enpals-payments/chart-enpals-payments.component';

import { ToDoCreateComponent } from './components/todo/create/create.component';
import { ToDoListComponent } from './components/todo/list/list.component';
import { ToDoExpiredComponent } from './components/todo/expired/expired.component';
import { ToDoListRowComponent } from './components/todo/list/row/row.component';
import { ToDoExpireRowComponent } from './components/todo/expired/row/row.component';
import { ToDoCurrentDayListComponent } from './components/todo/current-day-list/current-day-list.component';
import { ToDoCurrentDayRowComponent } from './components/todo/current-day-list/row/row.component';

import { IconsNavComponent } from './components/template/icons-nav/icons-nav.component';
import { NotificationsComponent } from './components/template/icons-nav/notifications/notifications.component';
import { ToDoDetailsComponent } from './components/todo/details/details.component';
import { FilmListRowComponent } from './components/film/list/row/row.component';
import { DubberListRowComponent } from './components/dubber/list/row/row.component';
import { ArchivedDubberRowComponent } from './components/dubber/archived/row/row.component';
import { SettingQualificationRowComponent } from './components/settings/qualification/list/row/row.component';
import { SettingCompanyRowComponent } from './components/settings/company/list/row/row.component';
import { SettingEnpalsParamRowComponent } from './components/settings/enpals-parameters/list/row/row.component';

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
    DubberArchivedComponent,
    FilmMainInformationsComponent,
    FilmDubbersListComponent,
    AddFilmDubberComponent,
    EnpalsPaymentsCreateComponent,
    EnpalsPaymentsListComponent,
    TableRowEnpalsPaymentsComponent,
    ChartEnpalsPaymentsComponent,
    ToDoCreateComponent,
    ToDoListComponent,
    IconsNavComponent,
    NotificationsComponent,
    ToDoCurrentDayListComponent,
    ToDoListRowComponent,
    ToDoExpiredComponent,
    ToDoExpireRowComponent,
    ToDoCurrentDayRowComponent,
    ToDoDetailsComponent,
    FilmListRowComponent,
    DubberListRowComponent,
    ArchivedDubberRowComponent,
    SettingQualificationRowComponent,
    SettingCompanyRowComponent,
    SettingEnpalsParamRowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,  // Add this!
    HttpClientModule,
    ChartsModule
  ],
  providers: [
    Service,
    DubberService,
    FilmService,
    InvoiceService,
    UserService,
    PagerService,
    EnpalsPaymentsService,
    PrintYears,
    LoadAllItems
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

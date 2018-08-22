import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './components/user/_auth/auth.guard';

// Layouts
import { LoggedLayoutComponent } from './components/template/layout/logged-layout/logged-layout.component';
import { NotloggedLayoutComponent } from './components/template/layout/notlogged-layout/notlogged-layout.component';

import { DubbersListComponent } from './components/dubber/list/list.component';
import { DubberProfileComponent } from './components/dubber/details/details.component';
import { AddDubberComponent } from './components/dubber/create/create.component';
import { DubberArchivedComponent } from './components/dubber/archived/archived.component';

import { FilmListComponent } from './components/film/list/list.component';
import { AddFilmComponent } from './components/film/create/create.component';
import { FilmDetailsComponent } from './components/film/details/details.component';

import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { UsersListComponent } from './components/user/list/list.component';
import { DetailsUserComponent } from './components/user/details/details.component';

import { DetailsInvoiceComponent } from './components/dubber/details/invoice/details/details.component';

import { CompanyCreateComponent } from './components/settings/company/create/create.component';
import { CompanyListComponent } from './components/settings/company/list/list.component';
import { CompanyDetailsComponent } from './components/settings/company/details/details.component';
import { QualificationCreateComponent } from './components/settings/qualification/create/create.component';
import { QualificationListComponent } from './components/settings/qualification/list/list.component';
import { QualificationDetailsComponent } from './components/settings/qualification/details/details.component';
import { EnpalsParametersListComponent } from './components/settings/enpals-parameters/list/list.component';
import { EnpalsParameterDetailsComponent } from './components/settings/enpals-parameters/details/details.component';

import { PageNotFoundComponent } from './components/widgets/page-not-found/page-not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { EnpalsPaymentsCreateComponent } from './components/enapls_payments/create/create.component';
import { EnpalsPaymentsListComponent } from './components/enapls_payments/list/list.component';
import { ChartEnpalsPaymentsComponent } from './components/enapls_payments/report/chart-enpals-payments/chart-enpals-payments.component';

import { ToDoCreateComponent } from './components/todo/create/create.component';
import { ToDoListComponent } from './components/todo/list/list.component';
import { ToDoExpiredComponent } from './components/todo/expired/expired.component';
import { ToDoCurrentDayListComponent } from './components/todo/current-day-list/current-day-list.component';

import { ContractCreateComponent } from './components/contract/create/create.component';
import { ContractListComponent } from './components/contract/list/list.component';

const appRoutes: Routes = [

  //App routes goes here
  {
    path: '',
    component: LoggedLayoutComponent,
    canActivate:[AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
        pathMatch: 'full',
        data: { title: 'Dashboard' }
        //canActivate:[AuthGuard]
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'Dashboard' }
        //canActivate:[AuthGuard]
      },
      {
        path: 'todo/list',
        component: ToDoListComponent,
        data: { title: 'To Do lista' }
      },
      {
        path: 'todo/current_list',
        component: ToDoCurrentDayListComponent,
        data: { title: 'To Do lista corrente' }
      },
      {
        path: 'todo/expired',
        component: ToDoExpiredComponent,
        data: { title: 'To Do scaduti' }
      },
      {
        path: 'todo/add',
        component: ToDoCreateComponent,
        data: { title: 'To Do nuovo' }
      },
      {
        path: 'contracts/new',
        component: ContractCreateComponent,
        data: { title: 'Nuovo contratto' }
      },
      {
        path: 'contracts',
        component: ContractListComponent,
        data: { title: 'Lista contratti' }
      },
      {
        path: 'users',
        component: UsersListComponent,
        data: { title: 'Lista utenti' }
      },
      {
        path: 'user/:id',
        component: DetailsUserComponent
      },
      {
        path: 'dubbers/list',
        component: DubbersListComponent,
        data: { title: 'Lista collaboratori' }
      },
      {
        path: 'dubbers/archived',
        component: DubberArchivedComponent,
        data: { title: 'Collaboratori archiviati' }
      },
      {
        path: 'dubbers/add',
        component: AddDubberComponent,
        data: { title: 'Aggiungi nuovo collaboratore' }
      },
      {
        path: 'dubber/:id',
        component: DubberProfileComponent
      },
      {
        path: 'invoice/:id/:dubber_id',
        component: DetailsInvoiceComponent
      },
      {
        path: 'films',
        component: FilmListComponent,
        data: { title: 'Lista film' }
      },
      {
        path: 'films/add',
        component: AddFilmComponent,
        data: { title: 'Aggiungi nuovo film' }
      },
      {
        path: 'film/:id',
        component: FilmDetailsComponent
      },
      {
        path: 'settings/company/add',
        component: CompanyCreateComponent,
        data: { title: 'Aggiungi nuovo azienda' }
      },
      {
        path: 'settings/companies',
        component: CompanyListComponent,
        data: { title: 'Lista aziende' }
      },
      {
        path: 'settings/company/:id',
        component: CompanyDetailsComponent
      },
      {
        path: 'settings/qualification/add',
        component: QualificationCreateComponent,
        data: { title: 'Add new qualification' }
      },
      {
        path: 'settings/qualifications',
        component: QualificationListComponent,
        data: { title: 'Qualification list' }
      },
      {
        path: 'settings/qualification/:id',
        component: QualificationDetailsComponent
      },
      {
        path: 'settings/enpals-parameters',
        component: EnpalsParametersListComponent,
        data: { title: 'Enpals Parameters list' }
      },
      {
        path: 'settings/enpals-parameter/:id',
        component: EnpalsParameterDetailsComponent
      },
      {
        path: 'enaplspayments',
        component: EnpalsPaymentsListComponent,
        data: { title: 'Enapls versamenti' }
      },
      {
        path: 'enaplspayments/add',
        component: EnpalsPaymentsCreateComponent,
        data: { title: 'Enapls versamenti' }
      },
      {
        path: 'enaplspayments/report',
        component: ChartEnpalsPaymentsComponent,
        data: { title: 'Report Enapls versamenti' }
      }
      // {
      //   path: '**',
      //   component: PageNotFoundComponent
      // }
    ]
  },

  // Site routes goes here
  // {
  //   path: '',
  //   component: NotloggedLayoutComponent,
  //   children: []
  // },

  // No layout routes
  {
    path: 'signup',
    component: RegisterComponent,
    data: { title: 'Register' }
  },
  {
    path: 'signin',
    component: LoginComponent,
    data: { title: 'Login' }
  },

  // otherwise redirect to home
  {
    path: '**', redirectTo: ''
  }

];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

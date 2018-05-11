import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DubbersListComponent } from './components/dubber/list/list.component';
import { DubberProfileComponent } from './components/dubber/details/details.component';
import { AddDubberComponent } from './components/dubber/create/create.component';
import { DubberArchivedComponent } from './components/dubber/archived/archived.component';

import { FilmListComponent } from './components/film/list/list.component';
import { AddFilmComponent } from './components/film/create/create.component';
import { FilmDetailsComponent } from './components/film/details/details.component';

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

const appRoutes: Routes = [

  {
    path: '',
    component: DashboardComponent
  },
  // {
  //   path: '',
  //   redirectTo: '/index',
  //   pathMatch: 'full'
  // },
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'Register' }
  },
  {
    path: 'users',
    component: UsersListComponent,
    data: { title: 'List users' }
  },
  {
    path: 'user/:id',
    component: DetailsUserComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { title: 'Dashboard' }
  },
  {
    path: 'dubbers/list',
    component: DubbersListComponent,
    data: { title: 'Dubbers List' }
  },
  {
    path: 'dubbers/archived',
    component: DubberArchivedComponent,
    data: { title: 'Dubbers Archived' }
  },
  {
    path: 'dubbers/add',
    component: AddDubberComponent,
    data: { title: 'Add new dubber' }
  },
  {
    path: 'dubber/:id',
    component: DubberProfileComponent
  },
  {
    path: 'invoice/:id',
    component: DetailsInvoiceComponent
  },
  {
    path: 'films',
    component: FilmListComponent,
    data: { title: 'Film List' }
  },
  {
    path: 'films/add',
    component: AddFilmComponent,
    data: { title: 'Add new film' }
  },
  {
    path: 'film/:id',
    component: FilmDetailsComponent
  },
  {
    path: 'settings/company/add',
    component: CompanyCreateComponent,
    data: { title: 'Add new company' }
  },
  {
    path: 'settings/companies',
    component: CompanyListComponent,
    data: { title: 'Company List' }
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
  // otherwise redirect to home
  // {
  //   path: '**',
  //   redirectTo: ''
  // }
  {
    path: '**',
    component: PageNotFoundComponent
  }

];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

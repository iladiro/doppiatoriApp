import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DubbersListComponent } from './components/dubber/list/list.component';
import { DubberProfileComponent } from './components/dubber/details/details.component';
import { AddDubberComponent } from './components/dubber/create/create.component';

import { FilmListComponent } from './components/film/list/list.component';
import { AddFilmComponent } from './components/film/create/create.component';
import { FilmDetailsComponent } from './components/film/details/details.component';

import { RegisterComponent } from './components/user/register/register.component';
import { UsersListComponent } from './components/user/list/list.component';
import { DetailsUserComponent } from './components/user/details/details.component';

import { DetailsInvoiceComponent } from './components/invoice/details/details.component';

import { CompanyCreateComponent } from './components/company/create/create.component';
import { CompanyListComponent } from './components/company/list/list.component';
import { CompanyDetailsComponent } from './components/company/details/details.component';

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
    path: 'dubbers',
    component: DubbersListComponent,
    data: { title: 'Dubbers List' }
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
    path: 'company/add',
    component: CompanyCreateComponent,
    data: { title: 'Add new company' }
  },
  {
    path: 'companies',
    component: CompanyListComponent,
    data: { title: 'Company List' }
  },
  {
    path: 'company/:id',
    component: CompanyDetailsComponent
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

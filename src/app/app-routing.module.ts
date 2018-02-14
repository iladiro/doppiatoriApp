import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DubbersListComponent } from './components/dubber/dubbers-list/dubbers-list.component';
import { DubberProfileComponent } from './components/dubber/dubber-profile/dubber-profile.component';
import { DubberInvoiceComponent } from './components/dubber/dubber-invoice/dubber-invoice.component';
import { AddDubberComponent } from './components/dubber/add-dubber/add-dubber.component';
import { FilmListComponent } from './components/film/film-list/film-list.component';
import { AddFilmComponent } from './components/film/add-film/add-film.component';
import { FilmDetailsComponent } from './components/film/film-details/film-details.component';
import { PageNotFoundComponent } from './components/widgets/page-not-found/page-not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewAccountComponent } from './components/account/new-account/new-account.component';
import { AccountsListComponent } from './components/account/accounts-list/accounts-list.component';
import { AccountDetailsComponent } from './components/account/account-details/account-details.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/index',
    pathMatch: 'full'
  },
  { path: 'index',
    component: DashboardComponent,
    data: { title: 'Index' }
  },
  {
    path: 'accounts',
    component: AccountsListComponent,
    data: { title: 'Accounts List' }
  },
  {
    path: 'account/:id',
    component: AccountDetailsComponent
  },
  {
    path: 'accounts/new',
    component: NewAccountComponent,
    data: { title: 'Add new account' }
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
    path: 'dubberProfile/:id',
    component: DubberProfileComponent
  },
  {
    path: 'invoice/:id',
    component: DubberInvoiceComponent
  },
  {
    path: 'film',
    component: FilmListComponent,
    data: { title: 'Film List' }
  },
  {
    path: 'film/add',
    component: AddFilmComponent,
    data: { title: 'Add new film' }
  },
  {
    path: 'film/:id',
    component: FilmDetailsComponent
  },
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

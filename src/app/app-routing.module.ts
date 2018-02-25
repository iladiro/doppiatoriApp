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
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { AuthGuard } from './components/user/_guards/auth.guard';
import { ListComponent } from './components/user/list/list.component';
import { DetailsUserComponent } from './components/user/details/details.component';

const appRoutes: Routes = [

  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  // {
  //   path: '',
  //   redirectTo: '/index',
  //   pathMatch: 'full'
  // },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'Register' }
  },
  {
    path: 'users',
    component: ListComponent,
    canActivate: [AuthGuard],
    data: { title: 'List users' }
  },
  {
    path: 'user/:id',
    canActivate: [AuthGuard],
    component: DetailsUserComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { title: 'Dashboard' }
  },
  {
    path: 'dubbers',
    component: DubbersListComponent,
    canActivate: [AuthGuard],
    data: { title: 'Dubbers List' }
  },
  {
    path: 'dubbers/add',
    component: AddDubberComponent,
    canActivate: [AuthGuard],
    data: { title: 'Add new dubber' }
  },
  {
    path: 'dubber/:id',
    canActivate: [AuthGuard],
    component: DubberProfileComponent
  },
  {
    path: 'invoice/:id',
    canActivate: [AuthGuard],
    component: DubberInvoiceComponent
  },
  {
    path: 'film',
    canActivate: [AuthGuard],
    component: FilmListComponent,
    data: { title: 'Film List' }
  },
  {
    path: 'film/add',
    component: AddFilmComponent,
    canActivate: [AuthGuard],
    data: { title: 'Add new film' }
  },
  {
    path: 'film/:id',
    canActivate: [AuthGuard],
    component: FilmDetailsComponent
  },
  // otherwise redirect to home
  {
    path: '**',
    redirectTo: ''
  }
  // {
  //   path: '**',
  //   component: PageNotFoundComponent
  // }

];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

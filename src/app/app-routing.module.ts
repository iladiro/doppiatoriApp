import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DubbersListComponent } from './components/dubber/dubbers-list/dubbers-list.component';
import { DubberProfileComponent } from './components/dubber/dubber-profile/dubber-profile.component';
import { AddDubberComponent } from './components/dubber/add-dubber/add-dubber.component';
import { FilmListComponent } from './components/film/film-list/film-list.component';
import { AddFilmComponent } from './components/film/add-film/add-film.component';
import { FilmDetailsComponent } from './components/film/film-details/film-details.component';

const appRoutes: Routes = [
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
  }
  // { path: '',
  //   redirectTo: '/dubbers',
  //   pathMatch: 'full'
  // }
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

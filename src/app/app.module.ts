import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DubbersListComponent } from './components/dubber/dubbers-list/dubbers-list.component';
import { DubberProfileComponent } from './components/dubber/dubber-profile/dubber-profile.component';
import { AddFormComponent } from './components/dubber/add-form/add-form.component';
import { HeaderComponent } from './components/template/header/header.component';
import { FilmListComponent } from './components/film/film-list/film-list.component';

const appRoutes: Routes = [
  {
    path: 'dubbers',
    component: DubbersListComponent,
    data: { title: 'Dubbers List' }
  },
  {
    path: 'dubberProfile/:id',
    component: DubberProfileComponent
  },
  {
    path: 'film',
    component: FilmListComponent,
    data: { title: 'Film List' }
  }
  // { path: '',
  //   redirectTo: '/dubberProfile',
  //   pathMatch: 'full'
  // }
  // {
  //   path: '**',
  //   component: PageNotFoundComponent
  // }
];

@NgModule({
  declarations: [
    AppComponent,
    DubbersListComponent,
    DubberProfileComponent,
    AddFormComponent,
    HeaderComponent,
    FilmListComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,  // Add this!
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DubbersListComponent } from './components/dubber/dubbers-list/dubbers-list.component';
import { DubberProfileComponent } from './components/dubber/dubber-profile/dubber-profile.component';

const appRoutes: Routes = [
  {
    path: '',
    component: DubbersListComponent
  },
  {
    path: 'dubberProfile/:id',
    component: DubberProfileComponent
  },
  // {
  //   path: 'hero/:id',
  //   component: HeroDetailComponent
  // },
  // {
  //   path: 'heroes',
  //   component: HeroListComponent,
  //   data: { title: 'Heroes List' }
  // },
  { path: '',
    redirectTo: '/dubberProfile',
    pathMatch: 'full'
  }
  // {
  //   path: '**',
  //   component: PageNotFoundComponent
  // }
];

@NgModule({
  declarations: [
    AppComponent,
    DubbersListComponent,
    DubberProfileComponent
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

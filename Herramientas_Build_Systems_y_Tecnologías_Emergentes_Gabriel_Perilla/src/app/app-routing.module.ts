import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AmpPageComponent } from './amp-page/amp-page.component';
import { StoragePageComponent } from './storage-page/storage-page.component';

const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'login', component: LoginPageComponent },
    { path: 'amp/:nombre/:precio/:cantidad/:url', component: AmpPageComponent },
    { path: 'storage', component: StoragePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';

import { AngularFireModule } from 'angularfire2';
import { AfService } from "./af.service";
import { Ng2FilterPipe } from './ng2-filter.pipe';
import { AmpPageComponent } from './amp-page/amp-page.component';
import { StoragePageComponent } from './storage-page/storage-page.component';

export const firebaseConfig = {
  apiKey: "AIzaSyDO_9rjwY1LuaosX4sx0LEJNzSH7YyVxm8",
  authDomain: "appangular2-b689b.firebaseapp.com",
  databaseURL: "https://appangular2-b689b.firebaseio.com",
  projectId: "appangular2-b689b",
  storageBucket: "appangular2-b689b.appspot.com",
  messagingSenderId: "882454605800"
};

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    Ng2FilterPipe,
    AmpPageComponent,
    StoragePageComponent    
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [AfService],
  bootstrap: [AppComponent]
})
export class AppModule { }

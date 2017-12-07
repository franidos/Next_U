import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription';

import { Router } from "@angular/router";
import { AfService } from "./af.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public isLoggedIn: boolean;
  subscription: Subscription;

  message: any = {};
  total: number = 0;

  constructor(public afService: AfService, private router: Router){
    this.afService.af.auth.subscribe(
      (auth) => {
        if(auth == null) {
          console.log("NO ha iniciado sesion.");

          this.isLoggedIn = false;
          this.router.navigate(['login']);
        }
        else {
          console.log("Inicio se sesion exitoso.");
          if(auth.google) {
            this.afService.displayName = auth.google.displayName;
            this.afService.email = auth.google.email;
          }
          else {
            this.afService.displayName = auth.auth.email;
            this.afService.email = auth.auth.email;
          }
          this.isLoggedIn = true;
          this.router.navigate(['']);          
        }
      }
    );

    this.subscription = this.afService.getMessage().subscribe(message =>
    {
      this.message = message;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.afService.logout();
  }
}

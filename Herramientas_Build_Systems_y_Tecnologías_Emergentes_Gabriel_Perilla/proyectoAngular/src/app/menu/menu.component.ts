import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { DataService } from '../data.service';
import { DataitemcarService } from '../dataitemcar.service';
import { ItemcarComponent } from '../itemcar/itemcar.component';
import { Router } from "@angular/router";
import { Item } from '../Item';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [ItemcarComponent]
})
export class MenuComponent implements OnInit {
  contador:number;
  shoppingcar:Item[]=[];

  constructor(private authService: AuthService,private dataService: DataService,private dataItemcar: DataitemcarService,private car:ItemcarComponent,private router:Router) {
  	this.dataService.initData();
    //dataService.item;
    //dataItemcar.initDataCar();
    this.dataItemcar.initDataCar();
  }

  ngOnInit() {
    //this.contador=this.dataItemcar.getTotalUnidadesCar();
    this.dataItemcar.initDataCar();
  }

  isAuth() {
    return this.authService.isAuthenticated();
  }

  isLogout() {
    return !this.authService.isAuthenticated();
  }

  onLogout() {
    this.authService.logout();
  }

  onShowCar(){
    this.dataItemcar.initDataCar();
    this.shoppingcar=this.dataItemcar.item;
    this.router.navigate(['/itemcar']);
  }
  
}

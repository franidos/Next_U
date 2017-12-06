import { Component, OnInit } from '@angular/core';

import { AfService } from "../af.service";
import { FirebaseListObservable, AngularFire, FirebaseObjectObservable } from "angularfire2";

import { detalle } from "../detalles";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {
  objectsFilter = { nombre: '' };

  public items : FirebaseListObservable<any[]>;
  private contador: number[] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  public arraylist : any[] = [];
  public totalunidad: number = 0;

  public bandera: number = 0;

  constructor(public afService: AfService, public af: AngularFire){
    this.items = this.af.database.list("/imagenes",{query:{orderByChild:'nombre'}});
    this.items.subscribe(items => {
      items.forEach(item => {
        this.bandera = this.afService.uploadItem(item.$key, item.cantidad, item.nombre, item.precio, item.unidad, item.url);
        if(this.bandera==21)
        {
          this.loadpage();
          this.afService.loadArrayStore();
        }
      });
    });
  }

  ngOnInit() {}

  up(item, cantidad, unidad)
  {
    if(this.contador[item]<cantidad)
    {
      this.contador[item]++;
    }
  }

  down(item, unidad)
  {
    if(this.contador[item]!=0)
    {
      this.contador[item]--;
    }
  }

  loadStore(event, key, cantidad, nombre, precio, unidad, url)
  {
    this.afService.loadStore(event, key, cantidad, nombre, precio, unidad, url);
  }

  loadpage()
  {
    this.arraylist = this.afService.arraylist;
    this.afService.arraylist.forEach((item, i) => {
      this.contador[i]=item.unidad;
    })
  }
}

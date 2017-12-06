import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Router } from "@angular/router";

import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import { detalle } from "./detalles";
import { store } from "./store";

@Injectable()
export class AfService {
  public email: string;
  public user: FirebaseObjectObservable<any>;
  public displayName: string;

  private subject = new Subject<any>();
  public arraylist : any[] = [];
  public arrayStore: any[] = [];
  public totalunidad: number = 0;

  bandera: number=0;

  constructor(public af: AngularFire, private router: Router) {
  }

  loginWithEmail(email, password) {
    return this.af.auth.login({
        email: email,
        password: password,
      },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      });
  }

  logout() {
    return this.af.auth.logout();
  }

  sendMessage(totalunidad)
  {
    this.subject.next({ unidad: totalunidad });
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  uploadItem(key, cantidad, nombre, precio, unidad, url)
  {
    if(this.bandera<21)
    {
      this.arraylist.push(new detalle(key, cantidad, nombre, precio, unidad, url));
      this.bandera++;
    }
    return this.bandera;
  }

  loadArrayStore()
  {
    var j = 0;
    this.arraylist.forEach((item, i) => {
      if(item.unidad!=0)
      {
        this.arrayStore[j] = item;
        j++;
      }
    })

    var lensuma = this.arrayStore.length;
    this.totalunidad=0;
    for(var i=0;i<lensuma;i++)
    {
      this.totalunidad += this.arrayStore[i].unidad;
    }
    this.sendMessage(this.totalunidad);
  }

  loadStore(event, key, cantidad, nombre, precio, unidad, url)
  {
    if(unidad!=0)
    {
      if(this.arrayStore[0]==null)
      {
        this.arrayStore.push(new store(key, cantidad, nombre, precio, unidad, url));
      }
      else
      {
        var longitud = this.arrayStore.length;
        console.log("longitud:"+longitud);
        for(var i=0;i<longitud;i++)
        {
          if(this.arrayStore[i].nombre==nombre)
          {
            this.arrayStore[i].unidad=unidad;
            break;
          }
          if((this.arrayStore[i].nombre!=nombre) && (i==longitud-1))
          {
            this.arrayStore.push(new store(key, cantidad, nombre, precio, unidad, url));
            break;
          }
        }
      }
      console.log(this.arrayStore);
      var lensuma = this.arrayStore.length;
      this.totalunidad=0;
      for(var i=0;i<lensuma;i++)
      {
        this.totalunidad += this.arrayStore[i].unidad;
      }
      this.arraylist.forEach((item,i) => {
        this.arrayStore.forEach((item2,j) => {
          if(item2.nombre==item.nombre)
          {
            this.arraylist[i].unidad=this.arrayStore[j].unidad;
          }
        })
      })
      this.sendMessage(this.totalunidad);
    }
  }

  pagar()
  {
    this.arrayStore.forEach(item =>{
      if(item.unidad!=0)
      {
        this.af.database.list("/imagenes").update(item.key, { cantidad: item.cantidad-item.unidad });
      }
    })
    this.arraylist.length=0;
    this.arrayStore.length=0;
    this.bandera = 0;
    this.router.navigate(['']);    
  }

}

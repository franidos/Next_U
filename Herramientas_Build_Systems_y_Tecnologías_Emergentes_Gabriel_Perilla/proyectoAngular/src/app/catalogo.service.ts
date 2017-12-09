import { Injectable } from '@angular/core';
//import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Http,Response } from '@angular/http';
import 'rxjs/Rx';
import { Item } from './Item';
@Injectable()
export class CatalogoService {

  constructor(private catalogo:Http) { }

  getDatos(){
  	return this.catalogo.get('https://proyecto-final-bd.firebaseio.com/.json')
  	.map((response: Response)=> response.json())
  }

  sendDatos(item: Item){
  	let datos=JSON.stringify(item);
  	return this.catalogo.post('https://carrito-8e5b3.firebaseio.com/.json',datos)
  	.map((response: Response)=>response.json())
  }

}

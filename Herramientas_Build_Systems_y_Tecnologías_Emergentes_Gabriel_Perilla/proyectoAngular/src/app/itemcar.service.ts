import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class ItemcarService {
	
  constructor(private itemcar:Http) { }

  getDatos(){
  	return this.itemcar.get('https://carrito-8e5b3.firebaseio.com/.json')
  	.map((response: Response)=> response.json())
  	//.subscribe(items => Object.keys())
  }
}

import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { CatalogoService } from './catalogo.service';
import { Producto } from './Producto';
import { Item } from './Item';
import { ItemcarService } from './itemcar.service';

@Injectable()
export class DataService {
  productos: Producto[];
  des:Producto;
  item: Item[]=[];
  //lastId: number = 0;

  constructor(private catalogoService:CatalogoService,private itemcarService:ItemcarService) { 
      //console.log(this.productos)
  }

  initData(){
  	this.catalogoService.getDatos()
      .subscribe(
        (data) => {
        this.productos=data
      }
    )
      //alert(this.productos)
  }

  getProductos(){
    let prod : Producto[] = [];
    console.log(this.productos);
    this.productos.forEach(element => {
        console.log(element.nombre);
        prod.push(element);
    });
    return prod;
  }

  getBusqueda(texto){
    let data : Producto[] = [];
    this.productos.forEach(element => {
      if(element.nombre == texto){
        data.push(element);
      }
    })
    return data;
  }

  newItem(data:Item){

    this.catalogoService.sendDatos(data)
      .subscribe(
        (data : Response) => console.log(data)
      )

  }
  
  getTotalUnidadesCar(){
    let total:number;
    this.itemcarService.getDatos().forEach(element=>{
      total=total+element.unidades;
      console.log(total);
    })

    return total;
  }
  
}

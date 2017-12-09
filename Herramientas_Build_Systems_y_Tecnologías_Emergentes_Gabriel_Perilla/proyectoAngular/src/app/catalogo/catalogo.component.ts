import { Component, OnInit, ViewChild, ElementRef, Pipe, PipeTransform } from '@angular/core';
import { Producto } from '../Producto';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Item } from '../Item';

@Component({
  moduleId: module.id,
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css'],
})
export class CatalogoComponent implements OnInit {

  productos: Object[];
  @ViewChild('input')
  input: ElementRef;
  //data: any[];
  lastId: number = 0;

  constructor(private dataService:DataService) {
    this.productos=dataService.productos;
  }

  ngOnInit() {
    let eventObservable = Observable.fromEvent(this.input.nativeElement, 'keyup')
    eventObservable.subscribe();
  }

  onNewItem(item:Item,cantidad:string){
    console.log(item.nombre+" - "+cantidad);
    let subtotal=parseInt(cantidad)*parseFloat(item.precio);
    let antes=item.unidades;
    //item.unidades=cantidad;
    //item.subtotal=String(subtotal);
    //item.id=++this.lastId;
    let newItem = new Item;
    newItem.nombre = item.nombre;
    newItem.precio = item.precio;
    newItem.unidades = cantidad;
    newItem.subtotal = String(subtotal);
    newItem.url=item.url;
      //this.data.addTarea(newTarea)

    this.dataService.newItem(newItem);
    item.unidades=String(parseInt(antes)-parseInt(cantidad));
  }

}

@Pipe({
  name: 'searchPipe',
  pure: false
})
export class SearchPipe implements PipeTransform {
  transform(productos: any[], searchTerm: string): any[] {
      searchTerm = searchTerm.toUpperCase();
      return productos.filter(item => {
        return item.nombre.toUpperCase().indexOf(searchTerm) !== -1 
      });
  }
}
import { Injectable } from '@angular/core';
import { ItemcarService } from './itemcar.service';
import { Item } from './Item';

@Injectable()
export class DataitemcarService {
  item:Item[]=[];

  constructor(private itemcarService:ItemcarService) { }
  
  initDataCar(){
  	this.itemcarService.getDatos()
      .subscribe(
        (data) => {
        this.item=data
        console.log(this.item)
      }
    )
  }


  getTotalUnidadesCar(){
    let total:number=8;
    
    
    return total;
  }

}

import { Component, OnInit } from '@angular/core';
import { AfService } from "../af.service";
 
@Component({
  selector: 'app-storage-page',
  templateUrl: './storage-page.component.html',
  styleUrls: ['./storage-page.component.css']
})

export class StoragePageComponent implements OnInit {

  arrayStore: any[] = [];

  subTotal: any[] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  total: number = 0;

  constructor(public afService: AfService) {
    this.arrayStore = this.afService.arrayStore;
    this.arrayStore.forEach((item, i) => {
      this.subTotal[item.key] = item.unidad * item.precio;
    })
    this.subTotal.forEach(item =>{
      if(item!=0)
      {
        this.total = this.total + item;
      }
    })
  }

  ngOnInit() {}

  pagar()
  {
    this.afService.pagar();
  }

}

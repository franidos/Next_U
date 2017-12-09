

import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { DataitemcarService } from './dataitemcar.service'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private dataService: DataService, private dataItemCar:DataitemcarService) {  
    dataService.initData();
    dataItemCar.initDataCar();
  }

  ngOnInit() {
    this.dataItemCar.initDataCar();
  }

}

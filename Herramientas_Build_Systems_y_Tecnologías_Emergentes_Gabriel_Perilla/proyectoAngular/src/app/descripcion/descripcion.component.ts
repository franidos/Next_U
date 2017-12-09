import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DataService } from '../data.service';


@Component({
  selector: 'app-descripcion',
  templateUrl: './descripcion.component.html',
  styleUrls: ['./descripcion.component.css']
})
export class DescripcionComponent implements OnInit {
  data:Object;

  constructor(private router:ActivatedRoute,private dataService:DataService) { }

  ngOnInit() {
  	this.data=this.dataService.getBusqueda(this.router.snapshot.params['id'])
  }



}

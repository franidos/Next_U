import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-amp-page', 
  templateUrl: './amp-page.component.html',
  styleUrls: ['./amp-page.component.css']
})
export class AmpPageComponent implements OnInit {

  tareas : Object[];
  nombre : string;
  precio : string;
  cantidad : string;
  url : string;

  constructor(private activatedRoute : ActivatedRoute) {
    this.nombre = this.activatedRoute.snapshot.params['nombre'];
    this.precio = this.activatedRoute.snapshot.params['precio'];
    this.cantidad = this.activatedRoute.snapshot.params['cantidad'];
    this.url = this.activatedRoute.snapshot.params['url'];
    console.log(this.nombre);
    console.log(this.url);
  }

  ngOnInit() {
  }

}

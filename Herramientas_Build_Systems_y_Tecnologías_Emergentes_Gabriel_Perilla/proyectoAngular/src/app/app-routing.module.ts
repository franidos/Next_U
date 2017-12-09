import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {Component} from '@angular/core';

import { SingupComponent } from "./singup/singup.component";
import { SinginComponent } from "./singin/singin.component";
import { CatalogoComponent } from "./catalogo/catalogo.component";
import { DescripcionComponent } from "./descripcion/descripcion.component";
import { ItemcarComponent } from "./itemcar/itemcar.component";

import { AuthGuard } from "./auth.guard";

const routes: Routes = [
  	{ path: '', redirectTo: 'singin', pathMatch: 'full' },
	{ path: 'singup', component: SingupComponent },
	{ path: 'singin', component: SinginComponent },
	{ path: 'catalogo', component: CatalogoComponent },
	{ path: 'descripcion/:id', component: DescripcionComponent },
	{ path: 'itemcar', component: ItemcarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
                                                                                                                                                                     
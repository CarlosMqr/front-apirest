import { Component,  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule,LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from 'src/header/component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component'; // se tiene que importar la classe y despues agreagr a 
import { ClienteService } from './clientes/cliente.service';
import {HttpClientModule} from '@angular/common/http';//conectarnos con el servidor remoto atravez de peticiones http
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './clientes/form.component';
import { PaginatorComponent } from './paginator/paginator.component'
import { FormsModule } from '@angular/forms';// en imports

import { registerLocaleData } from '@angular/common';
import localesES from '@angular/common/locales/es';


registerLocaleData(localesES, 'es')

const routes: Routes = [
  {path:'', redirectTo: '/clientes', pathMatch: 'full'},
  {path:'directivas', component: DirectivaComponent},
  {path:'clientes', component: ClientesComponent},
  {path:'clientes/page/:page', component: ClientesComponent},
  {path: 'clientes/form', component: FormComponent},//con esto ya esta mapeada 
  {path:'clientes/form/:id', component: FormComponent}

  

]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent,
    PaginatorComponent,
    
  ],
  imports: [
    HttpClientModule,// registrar a qui el import con el servidor
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule// se importa FormsModule
  

  ],
  providers: [ClienteService, {provide: LOCALE_ID, useValue: 'es' }],// aqui para clases service 
  bootstrap: [AppComponent]
})
export class AppModule { }

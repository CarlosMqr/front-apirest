import { Injectable } from '@angular/core';
import { formatDate, DatePipe } from '@angular/common';
import { CLIENTES } from './clientes.json';// se importa del json.ts la cosntante CLIENTES
import { Cliente } from './cliente';// para poder usar se importa la clientes
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';



@Injectable()
export class ClienteService {
 private urlEndPoint : string= 'http://localhost:8080/api/clientes'; // declarar la url el string en minuscula
private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http: HttpClient, private router: Router) { }// inyectar dependencia

  getClientes(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap((response: any) => {
        console.log('ClienteService: tap 1');
        (response.content as Cliente[]).forEach(cliente => console.log(cliente.nombre));
      }),
      map((response: any) => {
        (response.content as Cliente[]).map(cliente => {
          //cliente.nombre = cliente.nombre.toUpperCase();
          //let datePipe = new DatePipe('es');
          //cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy');
          //cliente.createAt = formatDate(cliente.createAt, 'dd-MM-yyyy', 'es');
          return cliente;
        });
        return response;
      }),
      tap(response => {
        console.log('ClienteService: tap 2');
        (response.content as Cliente[]).forEach(cliente => console.log(cliente.nombre));
      })
    );
  }

   create(cliente: Cliente): Observable<Cliente>{
        return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers : this.httpHeaders}).pipe(
            catchError(e =>{
              if(e.status == 400){
                return throwError(e);
              }
              console.error(e.error.Mensaje);
              swal(e.error.Mensaje,e.error.error,'error');
              return throwError(e);
            })
        );
   }


   getCliente(id): Observable<Cliente>{
     return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.Mensaje);
        swal('erro al editar', e.error.Mensaje, 'error');
        return throwError(e);

      })
     );
   }


   update(cliente: Cliente): Observable<any>{
     return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e =>{
        if(e.status == 400){
          return throwError(e);
        }
        console.error(e.error.Mensaje);
        swal(e.error.Mensaje,e.error.error,'error');
        return throwError(e);
      })

     );
   }

   delete(id: number): Observable<Cliente>{

    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e =>{
        console.error(e.error.Mensaje);
        swal(e.error.Mensaje,e.error.error,'error');
        return throwError(e);
      })
    );

   }
}

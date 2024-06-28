import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from './producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  //listado de productos en el Backend
  private baseURL = "http://localhost:8080/api/v1/productos";

  constructor(private http : HttpClient) { }

  //obtenemos los productos
  obtenerListaDeProductos():Observable<Producto[]>{
    return this.http.get<Producto[]>(this.baseURL);
  }

  //metodo para registrar productos
  registrarProducto(producto:Producto):Observable<Object>{
    return this.http.post(this.baseURL, producto);
  }

  //actualiza producto
  actualizarProducto(id:number,producto:Producto): Observable<Object>{
    return this.http.put(`${this.baseURL}/${id}`,producto);
  }

  //Metodo para obtener productos por Id
  obtenerProductoId(id:number): Observable<Producto>{
    return this.http.get<Producto>(`${this.baseURL}/${id}`);
  }

  eliminarProducto(id:number): Observable<any>{
    return this.http.delete(`${this.baseURL}/${id}`);
  }


}

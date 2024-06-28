import { Component, OnInit } from '@angular/core';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrar-producto',
  templateUrl: './registrar-producto.component.html',
  styleUrl: './registrar-producto.component.css'
})
export class RegistrarProductoComponent implements OnInit{

  producto: Producto = new Producto();
  error: string = ''; // Propiedad para almacenar mensajes de error
  constructor(private productoServicio:ProductoService, private router:Router) {
  }

  ngOnInit(): void {
  }

  guardarProducto(){
    this.productoServicio.registrarProducto(this.producto).subscribe({
      next: dato => {console.log(dato);
      this.irListaProductos();
    }, 
    error: (err) => {
      console.log(err);
      this.error = 'Error al registrar el producto'; // Capturar mensaje de error
    }
    });
  }
  
  irListaProductos(){
    this.router.navigate(['/productos']);
  }

  onSubmit(){
    this.guardarProducto();
  }

}

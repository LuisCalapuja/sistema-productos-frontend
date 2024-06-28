import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { RegistrarProductoComponent } from './registrar-producto.component';
import { ProductoService } from '../producto.service';
import { Producto } from '../producto';
import { of, throwError } from 'rxjs';

describe('RegistrarProductoComponent', () => {
  let component: RegistrarProductoComponent;
  let fixture: ComponentFixture<RegistrarProductoComponent>;
  let productoService: ProductoService; // Definir ProductoService
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrarProductoComponent],
      imports: [
        HttpClientModule, 
        FormsModule, 
        RouterTestingModule.withRoutes([
          { path: 'productos', redirectTo: '' } // Definir la ruta 'productos'
        ])
      ],
      providers: [
        ProductoService,
      ] 
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarProductoComponent);
    component = fixture.componentInstance;
    productoService = TestBed.inject(ProductoService); // Inyectar ProductoService
    router = TestBed.inject(Router); // Inyectar Router
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe manejar el error durante el registro del producto', fakeAsync(() => {
    const errorMessage = 'Error al registrar el producto';
    spyOn(productoService, 'registrarProducto').and.returnValue(throwError(() => new Error(errorMessage)));

    component.onSubmit();
    tick();
    fixture.detectChanges();

    expect(component.error).toEqual(errorMessage); 
  }));

  it('Debe registrar el producto con exito', fakeAsync(() => {
    const response = { message: 'Producto registrado correctamente' };
    spyOn(productoService, 'registrarProducto').and.returnValue(of(response));
    spyOn(router, 'navigate');

    component.onSubmit();
    tick();
    fixture.detectChanges();

    // Verificar el comportamiento esperado después de un registro exitoso
    expect(router.navigate).toHaveBeenCalledWith(['/productos']);
  }));
});

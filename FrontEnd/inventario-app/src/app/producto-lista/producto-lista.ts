import { Component, inject } from '@angular/core';
import { Producto } from '../models/producto.model';
import { ProductoService } from '../services/producto.service';
import { Router } from '@angular/router';
//import { RouterModule} from '@angular/router';

@Component({
  selector: 'app-producto-lista',
  imports: [],
  templateUrl: './producto-lista.html',
})
export class ProductoLista {
  productos!: Producto[];

  private productoServicio = inject(ProductoService);
  private enrutador = inject(Router);

  ngOnInit(){
    //Cargar los productos
    this.obtenerProductos();
  }

  private obtenerProductos(): void {
    this.productoServicio.obtenerProductosLista().subscribe(
    {
      next: (datos) => {
        this.productos = datos;
        console.log('Productos recibidos:', this.productos)
      },
      error: (error) => {
        console.error("Error al obtener los productos", error);
      }
    }
  );
  }

  editarProducto(id:number){
    this.enrutador.navigate(['editar-producto',id])
  }

  eliminarProducto(id:number){
    this.productoServicio.eliminarProducto(id).subscribe({
      next: (datos) => this.obtenerProductos(),
      error: (errores) => console.log(errores)
    });
  }


}

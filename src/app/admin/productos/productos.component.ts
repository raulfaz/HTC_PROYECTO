import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
//import { ProductService } from '../services/product.service';
import {MatTableModule} from '@angular/material/table';


@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule,FormsModule,MatIcon,MatTableModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent  {
  products: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'price', 'actions'];

 // constructor(private productService: ProductService) {}

  // ngOnInit() {
  //   this.loadProducts();
  // }

  // loadProducts() {
  //   this.productService.getProducts().subscribe(
  //     (data) => {
  //       this.products = data;
  //     },
  //     (error) => {
  //       console.error('Error al cargar productos', error);
  //     }
  //   );
  // }

  editProduct(product: any) {
    // Implementar lógica para editar producto
  }

  deleteProduct(productId: number) {
    // Implementar lógica para eliminar producto
  }
}

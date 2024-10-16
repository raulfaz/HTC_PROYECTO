import { Component, ViewChild } from '@angular/core';
import { SERVICIOS } from '../datos/servicios';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CatalogCarouselComponent } from "../catalogos/catalogos.component";

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatPaginatorModule, CatalogCarouselComponent],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  servicios = SERVICIOS;
  serviciosFiltrados = [...this.servicios];
  busqueda: string = '';
  currentPosition = 0;
  itemWidth = 200;

  catalogData = [
    { name: 'Catálogo 1', image: '/../assets/catalogs/catalog1.jpg', pdf: 'catalog1.pdf' },
    { name: 'Catálogo 2', image: '/../assets/catalogs/catalog2.jpeg', pdf: 'catalog2.pdf' },
    { name: 'Catálogo 3', image: '/../assets/catalogs/catalog3.jpg', pdf: 'catalog3.pdf' }
  ];

  // openCatalog(pdf: string) {
  //   window.open(/../assets/catalogs/${pdf}, '_blank');
  // }

  prevCatalog() {
    if (this.currentPosition === 0) {
      this.currentPosition = -(this.itemWidth * (this.catalogData.length - 1));
    } else {
      this.currentPosition += this.itemWidth;
    }
  }

  nextCatalog() {
    if (this.currentPosition <= -(this.itemWidth * (this.catalogData.length - 1))) {
      this.currentPosition = 0;
    } else {
      this.currentPosition -= this.itemWidth;
    }
  }

  buscarProductos() {
    const busquedaNormalizada = this.busqueda
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    this.serviciosFiltrados = this.servicios.filter(servicio => {
      const servicioNombreNormalizado = servicio.name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      return servicioNombreNormalizado.includes(busquedaNormalizada);
    });
    this.paginator.pageIndex = 0; // Reinicia el paginador al primer índice
  }

  categorias: string[] = [
    'Electrodomésticos',
    'Iluminación',
    'Herramientas',
    'Cables y Conectores',
    'Seguridad',
    'Control de Temperatura',
    'Sistemas de Energía',
    'Accesorios',
    'Componentes Electrónicos',
    'Mantenimiento'
  ];

  filtrarPorCategoria(categoria: string) {
    // this.serviciosFiltrados = this.servicios.filter(servicio => servicio.categoria === categoria);
    this.paginator.pageIndex = 0; // Reinicia el paginador al primer índice
  }

  actualizarPaginador() {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.serviciosFiltrados = this.servicios.slice(startIndex, endIndex);
  }
}
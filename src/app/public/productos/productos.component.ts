import { Component } from '@angular/core';
import { SERVICIOS } from '../datos/servicios';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {

  servicios = SERVICIOS

  serviciosFiltrados = [...this.servicios];
  busqueda: string = '';

  currentPosition = 0;
  itemWidth = 200; // Ancho de cada catálogo (ajustar según necesidad)

  catalogData = [
    { name: 'Catálogo 1', image: '/../assets/catalogs/catalog1.jpg', pdf: 'catalog1.pdf' },
    { name: 'Catálogo 2', image: '/../assets/catalogs/catalog2.jpeg', pdf: 'catalog2.pdf' },
    { name: 'Catálogo 3', image: '/../assets/catalogs/catalog3.jpg', pdf: 'catalog3.pdf' }
    // Puedes agregar más catálogos aquí
  ];

  // Método para abrir el catálogo en PDF
  openCatalog(pdf: string) {
    window.open(`/../assets/catalogs/${pdf}`, '_blank');
  }

  // Desplazamiento hacia la izquierda
  prevCatalog() {
    if (this.currentPosition === 0) {
      this.currentPosition = -(this.itemWidth * (this.catalogData.length - 1)); // Vuelve al último
    } else {
      this.currentPosition += this.itemWidth;
    }
  }

  // Desplazamiento hacia la derecha
  nextCatalog() {
    if (this.currentPosition <= -(this.itemWidth * (this.catalogData.length - 1))) {
      this.currentPosition = 0; // Vuelve al primero
    } else {
      this.currentPosition -= this.itemWidth;
    }
  }

  // Método para buscar productos
  buscarProductos() {
    const busquedaNormalizada = this.busqueda
      .toLowerCase()
      .normalize('NFD') // Normaliza la cadena
      .replace(/[\u0300-\u036f]/g, ''); // Elimina las tildes

    this.serviciosFiltrados = this.servicios.filter(servicio => {
      const servicioNombreNormalizado = servicio.name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, ''); // Normaliza el nombre del servicio
      return servicioNombreNormalizado.includes(busquedaNormalizada);
    });
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

  // Filtra los servicios según la categoría seleccionada
  filtrarPorCategoria(categoria: string) {
    // Implementa la lógica para filtrar servicios
    console.log(`Filtrando por la categoría: ${categoria}`);
    // Ejemplo: this.serviciosFiltrados = this.servicios.filter(servicio => servicio.categoria === categoria);
  }


}

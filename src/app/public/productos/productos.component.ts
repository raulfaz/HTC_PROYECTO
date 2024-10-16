import { Component, OnInit } from '@angular/core';
import { SERVICIOS } from '../datos/servicios';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CatalogService } from '../../admin/services/catalogos.service'; // Asegúrate de que la ruta sea correcta
import { Observable } from 'rxjs';
import { CatalogCarouselComponent } from '../catalogos/catalogos.component';


@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule,CatalogCarouselComponent],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit { // Implementa OnInit

  servicios = SERVICIOS;
  serviciosFiltrados = [...this.servicios];
  busqueda: string = '';

  currentPosition = 0;
  itemWidth = 200; // Ancho de cada catálogo (ajustar según necesidad)

  catalogData: any[] = []; // Inicialmente vacío

  constructor(private catalogService: CatalogService) {} // Inyección del servicio

  ngOnInit(): void {
    this.loadCatalogos(); // Cargar los catálogos al iniciar el componente
  }

  // Método para cargar los catálogos desde el servicio
  loadCatalogos() {
    this.catalogService.getCatalogos().subscribe(
      (data) => {
        this.catalogData = data; // Asigna los catálogos obtenidos a la variable catalogData
      },
      (error) => {
        console.error('Error al obtener los catálogos:', error);
      }
    );
  }

  // Método para abrir el catálogo en PDF
  openCatalog(pdfUrl: string) {
    window.open(pdfUrl, '_blank'); // Asegurarte de que el PDF se abra en una nueva pestaña
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
    console.log(`Filtrando por la categoría: ${categoria}`);
  }
}

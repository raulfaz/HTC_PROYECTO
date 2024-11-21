import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CatalogosPublicComponent } from '../catalogos-public/catalogos-public.component'
import { Catalogo } from '../../interfaces/catalog.interface';
import { Categoria } from '../../interfaces/catalog.interface';
import { CatalogService } from '../../admin/services/catalogos.service';
import { CategoriaService } from '../../admin/services/categoria.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatPaginatorModule,
    CatalogosPublicComponent
  ],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  catalogos: Catalogo[] = [];
  categorias: Categoria[] = [];
  catalogosFiltrados: Catalogo[] = [];
  busqueda: string = '';
  categoriaSeleccionada?: number;

  // Paginación
  pageSize = 12;
  currentPage = 0;
  totalCatalogos = 0;

  constructor(
    private catalogService: CatalogService,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit() {
    this.cargarCategorias();
    this.cargarCatalogos();
  }

  cargarCategorias() {
    this.categoriaService.getCategories().subscribe({
      next: (categorias) => {
        this.categorias = categorias;
      },
      error: (error) => {
        console.error('Error al cargar categorías:', error);
      }
    });
  }

  cargarCatalogos() {
    this.catalogService.getCatalogs().subscribe({
      next: (catalogos) => {
        this.catalogos = catalogos;
        this.actualizarCatalogosFiltrados();
      },
      error: (error) => {
        console.error('Error al cargar catálogos:', error);
      }
    });
  }

  buscarProductos() {
    this.currentPage = 0;
    this.actualizarCatalogosFiltrados();
  }

  filtrarPorCategoria(categoriaId: number) {
    this.categoriaSeleccionada = categoriaId;
    this.currentPage = 0;
    this.actualizarCatalogosFiltrados();
  }
  mostrarTodos() {
    this.categoriaSeleccionada = undefined;
    this.actualizarCatalogosFiltrados();
  }

  actualizarCatalogosFiltrados() {
    let catalogosFiltrados = [...this.catalogos];

    // Aplicar filtro de búsqueda
    if (this.busqueda) {
      const busquedaNormalizada = this.busqueda
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

      catalogosFiltrados = catalogosFiltrados.filter(catalogo => {
        const nombreNormalizado = catalogo.name
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
        return nombreNormalizado.includes(busquedaNormalizada);
      });
    }

    // Aplicar filtro de categoría
    if (this.categoriaSeleccionada) {
      catalogosFiltrados = catalogosFiltrados.filter(
        catalogo => catalogo.categoria_id === this.categoriaSeleccionada
      );
    }

    // Actualizar total para el paginador
    this.totalCatalogos = catalogosFiltrados.length;

    // Aplicar paginación
    const startIndex = this.currentPage * this.pageSize;
    this.catalogosFiltrados = catalogosFiltrados.slice(
      startIndex,
      startIndex + this.pageSize
    );
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.actualizarCatalogosFiltrados();
  }

  getImageUrl(catalogo: Catalogo): string {
    return catalogo.image_path ? this.catalogService.getFileUrl(catalogo.image_path) : '/assets/placeholder.jpg';
  }

  getPdfUrl(catalogo: Catalogo): string {
    return catalogo.pdf_path ? this.catalogService.getFileUrl(catalogo.pdf_path) : '';
  }

  getCategoriaName(categoriaId: number): string {
    const categoria = this.categorias.find(cat => cat.id === categoriaId);
    return categoria ? categoria.nombre : '';
  }
}
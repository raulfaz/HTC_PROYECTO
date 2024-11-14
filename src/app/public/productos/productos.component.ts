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
  template: `
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-content" data-aos="fade-down">
        <h1 style="font-size: 65px;">CALIDAD EN CADA PRODUCTO</h1>
        <p style="font-size: 18px;">
          Explora una amplia gama de productos eléctricos que transformarán tus proyectos. <br>
          <strong style="font-size: 18px;">"Comprometidos con la Excelencia".</strong>
        </p>
      </div>
    </div>

    <!-- Sección de Productos -->
    <div class="container">
      <div class="row">
        <div>
          <h3 class="text-center p-4" style="color: rgb(13, 65, 111)" data-aos="zoom-in">
            <strong>
              <b>CATALOGOS DISPONIBLES</b>
            </strong>
          </h3>
        </div>
        
        <!-- Sidebar de Categorías -->
        <div class="col-md-4 col-lg-3">
          <div class="card bg-light" style="background-color: #edf1f3;">
            <div class="card-header">
              <h5>Categorías</h5>
            </div>
            <ul class="list-group list-group-flush">
              <li 
                class="list-group-item" 
                *ngFor="let categoria of categorias" 
                (click)="filtrarPorCategoria(categoria.id)"
                [class.active]="categoriaSeleccionada === categoria.id"
                style="cursor: pointer;"
              >
                {{ categoria.nombre }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Contenido Principal -->
        <div class="col-md-8 col-lg-9">
          <h4>Buscar Productos</h4>
          <input 
            type="text" 
            class="form-control mb-3" 
            [(ngModel)]="busqueda" 
            placeholder="Buscar productos..."
            (input)="buscarProductos()"
          >
          
          <div class="row">
            <div class="col-md-4" *ngFor="let catalogo of catalogosFiltrados">
              <div class="card mb-3">
                <img 
                  [src]="getImageUrl(catalogo)" 
                  class="card-img-top" 
                  alt="{{ catalogo.name }}"
                  style="height: 200px; object-fit: cover;"
                >
                <div class="card-body">
                  <h5 class="card-title">{{ catalogo.name }}</h5>
                  <p class="card-text text-muted">{{ getCategoriaName(catalogo.categoria_id) }}</p>
                  <a 
                    *ngIf="catalogo.pdf_path"
                    [href]="getPdfUrl(catalogo)"
                    target="_blank"
                    class="btn btn-primary"
                  >
                    Ver catálogo
                  </a>
                </div>
              </div>
            </div>
          </div>

          <mat-paginator
            [length]="totalCatalogos"
            [pageSize]="pageSize"
            [pageSizeOptions]="[6, 12, 24, 100]"
            aria-label="Select page"
            (page)="onPageChange($event)"
          >
          </mat-paginator>
        </div>
      </div>
    </div>

    <!-- <div class="container-fluid m-0">
      <app-catalogos-public></app-catalogos-public>
    </div> -->
  `,
  styles: [`
    /* Hero Section -----------------------------------------------------*/
.hero-section {
  background-image: url('/../assets/img-fondos/fondo1.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 65vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  position: relative;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(13, 65, 111, 0.7);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  padding: 20px;
}

.hero-section h1 {
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.hero-section p {
  font-size: 1.70rem;
  margin-bottom: 1rem;
}

.hero-section h1 b, .hero-section p strong {
  font-size: 2rem;
}


  `]
})
export class ProductosComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  catalogos: Catalogo[] = [];
  categorias: Categoria[] = [];
  catalogosFiltrados: Catalogo[] = [];
  busqueda: string = '';
  categoriaSeleccionada?: number;
  
  // Paginación
  pageSize = 6;
  currentPage = 0;
  totalCatalogos = 0;

  constructor(
    private catalogService: CatalogService,
    private categoriaService: CategoriaService
  ) {}

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
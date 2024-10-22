import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CatalogService } from '../../admin/services/catalogos.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-catalogos-public',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './catalogos-public.component.html',
  styleUrl: './catalogos-public.component.css'
})
export class CatalogosPublicComponent implements OnInit, OnDestroy {

  
  catalogs: any[] = [];
  currentPosition = 0;
  itemWidth = 280;
  itemsToShow = 4;
  private resizeListener: (() => void) | null = null;

  constructor(
    private catalogosService: CatalogService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.loadCatalogs();
    
    if (isPlatformBrowser(this.platformId)) {
      // Inicializar itemsToShow basado en el ancho de la ventana actual
      this.updateItemsToShow();
      
      // Configurar el listener de resize
      this.resizeListener = () => this.updateItemsToShow();
      window.addEventListener('resize', this.resizeListener);
    } else {
      // Valor por defecto para SSR
      this.itemsToShow = 4;
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId) && this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
  }

  loadCatalogs() {
    this.catalogosService.getCatalogs().subscribe({
      next: (data) => {
        this.catalogs = data;
      },
      error: (error) => {
        console.error('Error loading catalogs:', error);
      }
    });
  }

  getFileUrl(path: string): string {
    return this.catalogosService.getFileUrl(path);
  }

  updateItemsToShow() {
    if (isPlatformBrowser(this.platformId)) {
      const width = window.innerWidth;
      if (width < 768) {
        this.itemsToShow = 1;
      } else if (width < 992) {
        this.itemsToShow = 2;
      } else if (width < 1200) {
        this.itemsToShow = 3;
      } else {
        this.itemsToShow = 4;
      }
      this.currentPosition = 0;
    }
  }

  nextCatalog() {
    const maxPosition = -(this.catalogs.length - this.itemsToShow) * this.itemWidth;
    if (this.currentPosition > maxPosition) {
      this.currentPosition -= this.itemWidth;
    }
  }

  prevCatalog() {
    if (this.currentPosition < 0) {
      this.currentPosition += this.itemWidth;
    }
  }

  openCatalog(pdfUrl: string) {
    if (isPlatformBrowser(this.platformId)) {
      const url = this.getFileUrl(pdfUrl);
      window.open(url, '_blank');
    }
  }
}
// catalog-carousel.component.ts
import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../../admin/services/catalogos.service'; // Asegúrate de que la ruta sea correcta
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalog-carousel',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="row mb-4">
      <div>
        <h3 class="text-center p-4" style="color: rgb(13, 65, 111)" data-aos="zoom-in">
          <strong>
            <b>CATÁLOGOS</b>
          </strong>
        </h3>
      </div>
      <div class="col-12">
        <div class="catalog-carousel">
          <button class="catalog-arrow left" (click)="prevCatalog()">
            <mat-icon>chevron_left</mat-icon>
          </button>
          <div class="catalog-wrapper">
            <div class="catalog-line"></div>
            <div class="catalog-items" [style.transform]="'translateX(' + currentPosition + 'px)'">
              <div class="catalog-item" *ngFor="let catalog of catalogs">
                <img [src]="getFileUrl(catalog.image_url)" class="d-block" [alt]="catalog.name" (click)="openCatalog(catalog.pdf_url)">
                <h4>{{catalog.name}}</h4>
                <a [href]="getFileUrl(catalog.pdf_url)" target="_blank" class="pdf-link">Ver PDF</a>
              </div>
            </div>
          </div>
          <button class="catalog-arrow right" (click)="nextCatalog()">
            <mat-icon>chevron_right</mat-icon>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .catalog-carousel {
      position: relative;
      width: 100%;
      overflow: hidden;
      padding: 20px 0;
    }

    .catalog-wrapper {
      position: relative;
      overflow: hidden;
      margin: 0 50px;
    }

    .catalog-items {
      display: flex;
      transition: transform 0.3s ease-in-out;
    }

    .catalog-item {
      flex: 0 0 auto;
      width: 250px;
      margin: 0 15px;
      text-align: center;
    }

    .catalog-item img {
      width: 100%;
      height: 350px;
      object-fit: cover;
      border-radius: 8px;
      cursor: pointer;
      transition: transform 0.2s ease;
    }

    .catalog-item img:hover {
      transform: scale(1.05);
    }

    .catalog-item h4 {
      margin: 10px 0;
      color: rgb(13, 65, 111);
    }

    .pdf-link {
      display: inline-block;
      padding: 8px 16px;
      background-color: rgb(13, 65, 111);
      color: white;
      text-decoration: none;
      border-radius: 4px;
      transition: background-color 0.2s ease;
    }

    .pdf-link:hover {
      background-color: rgb(9, 48, 83);
    }

    .catalog-arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 40px;
      height: 40px;
      border: none;
      border-radius: 50%;
      background-color: rgb(13, 65, 111);
      color: white;
      cursor: pointer;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s ease;
    }

    .catalog-arrow:hover {
      background-color: rgb(9, 48, 83);
    }

    .catalog-arrow.left {
      left: 10px;
    }

    .catalog-arrow.right {
      right: 10px;
    }

    .catalog-line {
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: rgb(13, 65, 111);
      opacity: 0.2;
    }
  `]
})
export class CatalogCarouselComponent implements OnInit {
  catalogs: any[] = [];
  currentPosition = 0;
  itemWidth = 280; // width + margin
  itemsToShow = 4;

  constructor(private catalogosService: CatalogService) {}

  ngOnInit() {
    this.loadCatalogs();
    this.updateItemsToShow();
    window.addEventListener('resize', () => this.updateItemsToShow());
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
    return path ? `http://localhost:3001/${path}` : '';
  }

  updateItemsToShow() {
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
    this.currentPosition = 0; // Reset position when screen size changes
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
    const url = this.getFileUrl(pdfUrl);
    window.open(url, '_blank');
  }
}
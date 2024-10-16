import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

interface Catalog {
  id: number;
  name: string;
  pdfUrl: string;
}

@Component({
  selector: 'app-catalogos',
  standalone: true,
  imports: [FormsModule,MatCardModule],
  templateUrl: './catalogos.component.html',
  styleUrl: './catalogos.component.css'
})
export class CatalogosComponent implements OnInit {
  catalogs: Catalog[] = [];
  selectedFile: File | null = null;

  ngOnInit() {
    // Aquí irían las llamadas a los servicios para obtener los catálogos reales
    this.catalogs = [
      { id: 1, name: 'Catálogo Verano 2024', pdfUrl: 'assets/catalogs/verano2024.pdf' },
      { id: 2, name: 'Catálogo Invierno 2024', pdfUrl: 'assets/catalogs/invierno2024.pdf' },
    ];
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  uploadCatalog() {
    // Lógica para subir el catálogo
    if (this.selectedFile) {
      // Aquí iría la lógica para enviar el archivo al servidor
      console.log('Subiendo archivo:', this.selectedFile.name);
    }
  }

  deleteCatalog(catalog: Catalog) {
    // Lógica para eliminar un catálogo
  }
}
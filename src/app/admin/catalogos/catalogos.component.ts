import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import Swal from 'sweetalert2';
import { CatalogService } from '../services/catalogos.service';

@Component({
  selector: 'app-catalogs',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './catalogos.component.html',
  styleUrls: ['./catalogos.component.css']
})
export class CatalogosComponent implements OnInit {
  showForm = false;
  isEditing = false;
  catalogForm: FormGroup;
  displayedColumns: string[] = ['name', 'image', 'pdf', 'actions'];
  catalogs: any[] = []; // Lista de catálogos
  selectedImage: File | null = null;
  selectedPdf: File | null = null;
  catalogId: number | null = null; // ID del catálogo que se está editando

  constructor(
    private fb: FormBuilder,
    private catalogService: CatalogService
  ) {
    this.catalogForm = this.fb.group({
      name: ['', Validators.required],
      image: [null],
      pdf: [null]
    });
  }

  ngOnInit() {
    this.fetchCatalogs(); // Cargar los catálogos al iniciar el componente
  }

  fetchCatalogs() {
    this.catalogService.getCatalogs().subscribe(
      (data) => {
        this.catalogs = data;
      },
      (error) => {
        console.error('Error al obtener los catálogos', error);
      }
    );
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.isEditing = false;
      this.catalogForm.reset();
    }
  }

  onImageSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  onPdfSelected(event: any) {
    this.selectedPdf = event.target.files[0];
  }

  editCatalog(catalog: any) {
    this.isEditing = true;
    this.showForm = true;
    this.catalogId = catalog.id;
    this.catalogForm.patchValue({
      name: catalog.name
    });
  }

  deleteCatalog(catalog: any) {
    if (confirm('¿Estás seguro de que deseas eliminar este catálogo?')) {
      this.catalogService.deleteCatalog(catalog.id).subscribe(
        () => {
          Swal.fire('Eliminado', 'Catálogo eliminado con éxito', 'success');
          this.fetchCatalogs();
        },
        (error) => {
          Swal.fire('Error', 'No se pudo eliminar el catálogo', 'error');
        }
      );
    }
  }

  onSubmit() {
    if (this.catalogForm.valid) {
      const formData = new FormData();
      formData.append('name', this.catalogForm.get('name')?.value);
      if (this.selectedImage) {
        formData.append('image', this.selectedImage);
      }
      if (this.selectedPdf) {
        formData.append('pdf', this.selectedPdf);
      }

      if (this.isEditing && this.catalogId) {
        this.catalogService.updateCatalog(this.catalogId, formData).subscribe(
          (response) => {
            Swal.fire('Actualizado', 'Catálogo actualizado con éxito', 'success');
            this.toggleForm();
            this.fetchCatalogs(); // Actualizar lista de catálogos
          },
          (error) => {
            Swal.fire('Error', 'No se pudo actualizar el catálogo', 'error');
          }
        );
      } else {
        this.catalogService.createCatalog(formData).subscribe(
          (response) => {
            Swal.fire('Guardado', 'Catálogo creado con éxito', 'success');
            this.toggleForm();
            this.fetchCatalogs(); // Actualizar lista de catálogos
          },
          (error) => {
            Swal.fire('Error', 'No se pudo guardar el catálogo', 'error');
          }
        );
      }
    } else {
      this.catalogForm.markAllAsTouched();
    }
  }
}

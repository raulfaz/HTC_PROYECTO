import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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
  catalogs: any[] = [];
  selectedImage: File | null = null;
  selectedPdf: File | null = null;
  catalogId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private catalogosService: CatalogService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.catalogForm = this.fb.group({
      name: ['', Validators.required],
      image: [null, Validators.required],
      pdf: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.fetchCatalogs();
  }

  fetchCatalogs() {
    this.catalogosService.getCatalogs().subscribe(
      (data) => {
        this.catalogs = data;
      },
      (error) => {
        console.error('Error al obtener los catálogos', error);
        Swal.fire('Error', 'No se pudieron cargar los catálogos', 'error');
      }
    );
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.isEditing = false;
      this.catalogForm.reset();
      // Restauramos las validaciones originales
      this.catalogForm = this.fb.group({
        name: ['', Validators.required],
        image: [null, Validators.required],
        pdf: [null, Validators.required]
      });
      this.selectedImage = null;
      this.selectedPdf = null;
    }
  }

  onImageSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.selectedImage = event.target.files[0];
      this.catalogForm.patchValue({
        image: this.selectedImage
      });
      this.catalogForm.get('image')?.updateValueAndValidity();
    }
  }

  onPdfSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.selectedPdf = event.target.files[0];
      this.catalogForm.patchValue({
        pdf: this.selectedPdf
      });
      this.catalogForm.get('pdf')?.updateValueAndValidity();
    }
  }

  editCatalog(catalog: any) {
    this.isEditing = true;
    this.showForm = true;
    this.catalogId = catalog.id;
    
    // Guardamos las URLs existentes
    this.catalogForm.patchValue({
      name: catalog.name,
      image: catalog.image_url ? 'existing' : null,
      pdf: catalog.pdf_url ? 'existing' : null
    });

    // Si estamos editando, no requerimos nuevos archivos si ya existen
    if (catalog.image_url) {
      this.catalogForm.get('image')?.clearValidators();
      this.catalogForm.get('image')?.updateValueAndValidity();
    }
    
    if (catalog.pdf_url) {
      this.catalogForm.get('pdf')?.clearValidators();
      this.catalogForm.get('pdf')?.updateValueAndValidity();
    }
  }

  deleteCatalog(catalog: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.catalogosService.deleteCatalog(catalog.id).subscribe(
          () => {
            Swal.fire('Eliminado', 'Catálogo eliminado con éxito', 'success');
            this.fetchCatalogs();
          },
          (error) => {
            Swal.fire('Error', 'No se pudo eliminar el catálogo', 'error');
          }
        );
      }
    });
  }

  onSubmit() {
    if (!this.catalogForm.get('name')?.valid) {
      Swal.fire('Error', 'El nombre es requerido', 'error');
      return;
    }

    if (!this.isEditing) {
      // Validaciones para nuevo catálogo
      if (!this.selectedImage) {
        Swal.fire('Error', 'Debe seleccionar una imagen', 'error');
        return;
      }
      if (!this.selectedPdf) {
        Swal.fire('Error', 'Debe seleccionar un PDF', 'error');
        return;
      }
    }

    const formData = new FormData();
    formData.append('name', this.catalogForm.get('name')?.value);
    
    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }
    if (this.selectedPdf) {
      formData.append('pdf', this.selectedPdf);
    }

    if (this.isEditing && this.catalogId) {
      this.catalogosService.updateCatalog(this.catalogId, formData).subscribe(
        (response) => {
          Swal.fire('Actualizado', 'Catálogo actualizado con éxito', 'success');
          this.toggleForm();
          this.fetchCatalogs();
        },
        (error) => {
          Swal.fire('Error', 'No se pudo actualizar el catálogo', 'error');
        }
      );
    } else {
      this.catalogosService.createCatalog(formData).subscribe(
        (response) => {
          Swal.fire('Guardado', 'Catálogo creado con éxito', 'success');
          this.toggleForm();
          this.fetchCatalogs();
        },
        (error) => {
          Swal.fire('Error', 'No se pudo guardar el catálogo', 'error');
        }
      );
    }
  }

  getFileUrl(path: string): string {
    return this.catalogosService.getFileUrl(path);
  }

  openCatalog(pdfUrl: string) {
    if (isPlatformBrowser(this.platformId)) {
      const url = this.getFileUrl(pdfUrl);
      window.open(url, '_blank');
    }
  }

  // Método auxiliar para validar campos individuales
  isFieldInvalid(fieldName: string): boolean {
    const field = this.catalogForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  // Método auxiliar para obtener el mensaje de error de un campo
  getErrorMessage(fieldName: string): string {
    const field = this.catalogForm.get(fieldName);
    if (field?.hasError('required')) {
      return `El ${fieldName} es requerido`;
    }
    return '';
  }
}
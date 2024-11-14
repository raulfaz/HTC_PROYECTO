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
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../../interfaces/catalog.interface';

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
    MatInputModule,
    MatOption,
    MatInputModule,
    MatSelect
  ],
  templateUrl: './catalogos.component.html',
  styleUrls: ['./catalogos.component.css']
})
export class CatalogosComponent implements OnInit {
  showForm = false;
  isEditing = false;
  catalogForm: FormGroup;
  displayedColumns: string[] = ['position', 'name', 'image', 'pdf', 'actions'];
  catalogs: any[] = [];
  selectedImage: File | null = null;
  selectedPdf: File | null = null;
  catalogId: number | null = null;
  categories: Categoria[] = [];

  

  constructor(
    private categoriaService: CategoriaService,
    private fb: FormBuilder,
    private catalogosService: CatalogService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.catalogForm = this.fb.group({
      name: ['', Validators.required],
      image: [null, Validators.required],
      pdf: [null, Validators.required],
      categoria_id: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.fetchCatalogs();
    this.loadCategories();
  }

  // fetchCatalogs() {
  //   this.catalogosService.getCatalogs().subscribe(
  //     (data) => {
  //       this.catalogs = data;
  //     },
  //     (error) => {
  //       console.error('Error al obtener los catálogos', error);
  //       Swal.fire('Error', 'No se pudieron cargar los catálogos', 'error');
  //     }
  //   );
  // }

  loadCategories(): void {
    this.categoriaService.getCategories().subscribe(
      (data) => this.categories = data,
      (error) => console.error('Error al cargar categorías:', error)
    );
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.isEditing = false;
      this.catalogForm.reset();
      this.catalogForm = this.fb.group({
        name: ['', Validators.required],
        image: [null, Validators.required],
        pdf: [null, Validators.required],
        categoria_id: [null, Validators.required]
      });
      this.selectedImage = null;
      this.selectedPdf = null;
    }
  }

  getFileUrl(path: string): string {
    if (!path) return '';
    return this.catalogosService.getFileUrl(path);
  }

  handleImageError(event: any) {
    console.error('Error al cargar la imagen:', event);
    event.target.src = 'assets/images/no-image.png'; // Asegúrate de tener esta imagen
  }

  openCatalog(pdfPath: string) {
    if (!pdfPath) return;
    
    if (isPlatformBrowser(this.platformId)) {
      const url = this.getFileUrl(pdfPath);
      console.log('Abriendo PDF:', url); // Para debugging
      window.open(url, '_blank');
    }
  }

  fetchCatalogs() {
    this.catalogosService.getCatalogs().subscribe(
      (data) => {
        console.log('Datos de catálogos recibidos:', data); // Para debugging
        this.catalogs = data;
      },
      (error) => {
        console.error('Error al obtener los catálogos:', error);
        Swal.fire('Error', 'No se pudieron cargar los catálogos', 'error');
      }
    );
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
    
    // Pre-fill form fields and indicate "existing" if file URLs are present
    this.catalogForm.patchValue({
      name: catalog.name,
      image: catalog.image_url ? 'existing' : null,
      pdf: catalog.pdf_url ? 'existing' : null,
      categoria_id: catalog.categoria_id
    });
  
    // Clear validators for existing files
    if (catalog.image_url) {
      this.catalogForm.get('image')?.clearValidators();
    }
    if (catalog.pdf_url) {
      this.catalogForm.get('pdf')?.clearValidators();
    }
  
    this.catalogForm.get('image')?.updateValueAndValidity();
    this.catalogForm.get('pdf')?.updateValueAndValidity();
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

  onSubmit(): void {
    if (this.catalogForm.valid) {
      // Aquí puedes enviar el formulario con los valores
      console.log('Formulario enviado', this.catalogForm.value);
    } else {
      console.log('Formulario no válido');
    }
  
    const formData = new FormData();
    formData.append('name', this.catalogForm.get('name')?.value);
    formData.append('categoria_id', this.catalogForm.get('categoria_id')?.value);
  
    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }
    if (this.selectedPdf) {
      formData.append('pdf', this.selectedPdf);
    }
  
    // Diferenciar entre creación y edición
    if (this.isEditing && this.catalogId) {
      this.catalogosService.updateCatalog(this.catalogId, formData).subscribe(
        (response) => {
          Swal.fire('Actualizado', 'Catálogo actualizado con éxito', 'success');
          this.toggleForm();
          this.fetchCatalogs();
        },
        (error) => {
          console.error('Error al actualizar catálogo:', error);
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
          console.error('Error al guardar catálogo:', error);
          Swal.fire('Error', 'No se pudo guardar el catálogo', 'error');
        }
      );
    }
  }   
}
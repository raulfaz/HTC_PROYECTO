import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CategoriaDialogComponent } from './categoria-dialog/categoria-dialog.component';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../../interfaces/catalog.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="categories-container">
      <div class="header">
        <h1>Gestión de Categorías</h1>
        <button mat-raised-button color="primary" (click)="openDialog()">
          <mat-icon>add</mat-icon>
          Nueva Categoría
        </button>
      </div>

      <div class="table-container mat-elevation-z4">
        <div class="loading-shade" *ngIf="isLoading">
          <mat-spinner diameter="50"></mat-spinner>
        </div>

        <table mat-table [dataSource]="categories">
          <!-- Nombre Column -->
          <ng-container matColumnDef="nombre">
            <th mat-header-cell *matHeaderCellDef> Nombre </th>
            <td mat-cell *matCellDef="let categoria"> {{categoria.nombre}} </td>
          </ng-container>

          <!-- Descripción Column -->
          <ng-container matColumnDef="descripcion">
            <th mat-header-cell *matHeaderCellDef> Descripción </th>
            <td mat-cell *matCellDef="let categoria"> {{categoria.descripcion || 'Sin descripción'}} </td>
          </ng-container>

          <!-- Fecha Column -->
          <ng-container matColumnDef="fecha">
            <th mat-header-cell *matHeaderCellDef> Fecha de creación </th>
            <td mat-cell *matCellDef="let categoria"> 
              {{categoria.created_at | date:'dd/MM/yyyy HH:mm'}} 
            </td>
          </ng-container>

          <!-- Acciones Column -->
          <ng-container matColumnDef="acciones">
            <th mat-header-cell *matHeaderCellDef> Acciones </th>
            <td mat-cell *matCellDef="let categoria">
              <button mat-icon-button color="primary" 
                      (click)="openDialog(categoria)"
                      matTooltip="Editar categoría">
                <mat-icon>edit</mat-icon>
              </button>
              <button mat-icon-button color="warn" 
                      (click)="deleteCategory(categoria)"
                      matTooltip="Eliminar categoría">
                <mat-icon>delete</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>

          <!-- Row shown when there is no matching data -->
          <tr class="mat-row" *matNoDataRow>
            <td class="mat-cell" colspan="4">
              No hay categorías disponibles
            </td>
          </tr>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .categories-container {
      padding: 24px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }
    .table-container {
      position: relative;
      min-height: 200px;
    }
    table {
      width: 100%;
    }
    .loading-shade {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.15);
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .mat-column-acciones {
      width: 120px;
      text-align: center;
    }
    .mat-column-nombre {
      width: 25%;
    }
    .mat-column-descripcion {
      width: 45%;
    }
    .mat-column-fecha {
      width: 15%;
    }
    tr.mat-row:hover {
      background: whitesmoke;
    }
  `]
})
export class CategoriasComponent implements OnInit {
  categories: Categoria[] = [];
  displayedColumns: string[] = ['nombre', 'descripcion', 'fecha', 'acciones'];
  isLoading = false;

  constructor(
    private categoriaService: CategoriaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.isLoading = true;
    this.categoriaService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.isLoading = false;
      },
      error: (error) => {
        this.showSnackBar('Error al cargar las categorías', 'error');
        this.isLoading = false;
        console.error('Error al cargar categorías:', error);
      }
    });
  }

  openDialog(categoria?: Categoria): void {
    const dialogRef = this.dialog.open(CategoriaDialogComponent, {
      width: '500px',
      data: categoria || null,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (categoria) {
          this.updateCategory(categoria.id, result);
        } else {
          this.createCategory(result);
        }
      }
    });
  }

  createCategory(data: { nombre: string; descripcion?: string }): void {
    this.isLoading = true;
    this.categoriaService.createCategory(data).subscribe({
      next: () => {
        this.showSnackBar('Categoría creada exitosamente');
        this.loadCategories();
      },
      error: (error) => {
        this.isLoading = false;
        this.showSnackBar('Error al crear la categoría', 'error');
        console.error('Error al crear categoría:', error);
      }
    });
  }

  updateCategory(id: number, data: { nombre: string; descripcion?: string }): void {
    this.isLoading = true;
    this.categoriaService.updateCategory(id, data).subscribe({
      next: () => {
        this.showSnackBar('Categoría actualizada exitosamente');
        this.loadCategories();
      },
      error: (error) => {
        this.isLoading = false;
        this.showSnackBar('Error al actualizar la categoría', 'error');
        console.error('Error al actualizar categoría:', error);
      }
    });
  }

  deleteCategory(categoria: Categoria): void {
    if (confirm(`¿Está seguro que desea eliminar la categoría "${categoria.nombre}"?`)) {
      this.isLoading = true;
      this.categoriaService.deleteCategory(categoria.id).subscribe({
        next: () => {
          this.showSnackBar('Categoría eliminada exitosamente');
          this.loadCategories();
        },
        error: (error) => {
          this.isLoading = false;
          this.showSnackBar('Error al eliminar la categoría', 'error');
          console.error('Error al eliminar categoría:', error);
        }
      });
    }
  }

  private showSnackBar(message: string, type: 'error' | 'success' = 'success'): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: type === 'error' ? ['error-snackbar'] : ['success-snackbar']
    });
  }
}
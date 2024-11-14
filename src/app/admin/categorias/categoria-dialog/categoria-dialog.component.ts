// src/app/components/categorias/categoria-dialog/categoria-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Category } from '../../../interfaces/category.interface';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-categoria-dialog',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MatDialogModule, MatFormFieldModule, MatInput],
  template: `
    <h2 mat-dialog-title>{{ data ? 'Editar' : 'Nueva' }} Categoría</h2>
    <mat-dialog-content>
      <form [formGroup]="form" class="categoria-form">
      <mat-form-field appearance="outline" class="w-100">
  <mat-label>Nombre de la categoría</mat-label>
  <input matInput formControlName="nombre" placeholder="Ingresa el nombre de la categoría">
  <mat-error *ngIf="form.get('nombre')?.errors?.['required']">
    El nombre es requerido
  </mat-error>
</mat-form-field>


        <mat-form-field appearance="outline" class="w-100">
          <mat-label>Descripción</mat-label>
          <textarea matInput formControlName="descripcion" rows="3" 
                    placeholder="Descripción de la categoría"></textarea>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancelar</button>
      <button mat-raised-button color="primary" 
              [disabled]="form.invalid"
              (click)="onSubmit()">
        {{ data ? 'Actualizar' : 'Crear' }}
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .categoria-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      min-width: 350px;
      padding-top: 16px;
    }
  `]
})
export class CategoriaDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CategoriaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category | null
  ) {
    this.form = this.fb.group({
      nombre: [data?.nombre || '', Validators.required],
      descripcion: [data?.descripcion || '']
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
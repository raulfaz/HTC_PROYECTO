import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

export interface Cotizacion {
  nombre: string;
  telefono: string;
  email: string;
  mensaje: string;
}

@Component({
  selector: 'app-cotizacion',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatPaginatorModule, MatTableModule, MatSort],
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css']
})
export class CotizacionComponent implements AfterViewInit {

  displayedColumns: string[] = ['nombre', 'telefono', 'email', 'mensaje'];
  dataSource = new MatTableDataSource<Cotizacion>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Filtro personalizado por el campo nombre
    this.dataSource.filterPredicate = (data: Cotizacion, filter: string) => {
      return data.nombre.trim().toLowerCase().includes(filter);
    };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

const ELEMENT_DATA: Cotizacion[] = [
  { nombre: 'Juan Pérez', telefono: '0998765432', email: 'juan@example.com', mensaje: 'Quiero cotizar un servicio.' },
  { nombre: 'Maria Gomez', telefono: '0987654321', email: 'maria@example.com', mensaje: 'Cotización para evento.' },
  { nombre: 'Carlos Lopez', telefono: '0976543210', email: 'carlos@example.com', mensaje: 'Cotización para software.' },
  { nombre: 'Pedro Ramirez', telefono: '0981234567', email: 'pedro@example.com', mensaje: 'Cotización para desarrollo web.' },
  { nombre: 'Pedro Ramirez', telefono: '0981234567', email: 'pedro@example.com', mensaje: 'Cotización para desarrollo web.' },
  { nombre: 'Pedro Ramirez', telefono: '0981234567', email: 'pedro@example.com', mensaje: 'Cotización para desarrollo web.' },
  { nombre: 'Pedro Ramirez', telefono: '0981234567', email: 'pedro@example.com', mensaje: 'Cotización para desarrollo web.' },

];

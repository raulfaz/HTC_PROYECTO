import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { RegistroService } from '../../public/services/registro.service';

export interface Cotizacion {
  nombre: string;
  telefono: string;
  email: string;
  mensaje: string;
  fecha?: string; // Agrega la propiedad si es necesaria
}

@Component({
  selector: 'app-cotizacion',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatPaginatorModule, MatTableModule, MatSort, MatIcon],
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css']
})
export class CotizacionComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'nombre', 'telefono', 'email', 'mensaje', 'fecha', 'acciones'];
  dataSource = new MatTableDataSource<Cotizacion>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private registroService: RegistroService) {} // Inyecta el servicio

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Filtro personalizado por el campo nombre
    this.dataSource.filterPredicate = (data: Cotizacion, filter: string) => {
      return data.nombre.trim().toLowerCase().includes(filter);
    };

    // Cargar los formularios al inicializar el componente
    this.loadCotizaciones();
  }

  loadCotizaciones() {
    this.registroService.getAllFormularios().subscribe(
      (data) => {
        this.dataSource.data = data; // Asume que la respuesta es un array de Cotizacion
      },
      (error) => {
        console.error('Error al obtener cotizaciones:', error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(element: Cotizacion) {
    const phoneNumber = 593 + element.telefono; // Asegúrate de que el número esté en el formato correcto (código de país incluido)
    const message = `Hola ${element.nombre},`;
    const encodedMessage = encodeURIComponent(message);
    
    // Cambia la URL para usar la nueva API
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
    
    // Abre la URL en una nueva pestaña
    window.open(whatsappUrl, '_blank');
  }
  
  
}



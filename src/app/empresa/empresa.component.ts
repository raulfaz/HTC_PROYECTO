import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { SERVICIOS } from '../datos/servicios';

@Component({
  selector: 'app-empresa',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatGridListModule, MatTabsModule],
  templateUrl: './empresa.component.html',
  styleUrl: './empresa.component.css'
})
export class EmpresaComponent {

  servicios = SERVICIOS

  currentPosition = 0;
  itemWidth = 320; // Ajuste para el ancho de las tarjetas

  timelineData = [
    {
      icon: 'business',
      year: '2015',
      title: 'Fundación de la empresa',
      description: 'Inicio de operaciones con un equipo profesional enfocado en soluciones eléctricas eficientes.',
      image: "../assets/img-generales/logo.png" // Ruta de la imagen
    },
    {
      icon: 'public',
      year: '2018',
      title: 'Expansión internacional',
      description: 'Nos expandimos hacia nuevos mercados en Latinoamérica, con oficinas en varios países.',
      image: '\..\assets\img-generales\logo-esloga.png'
    },
    {
      icon: 'bolt',
      year: '2020',
      title: 'Innovación y nuevas tecnologías',
      description: 'Introducción de nuevas tecnologías en nuestros servicios, apostando por la innovación.',
      image: '\..\assets\img-generales\logo.png'
    },
    {
      icon: 'engineering',
      year: '2022',
      title: 'Crecimiento del equipo',
      description: 'El equipo de la empresa creció con la incorporación de nuevos especialistas en diversas áreas.',
      image: '\..\assets\img-generales\edificio.jpg'
    },
    {
      icon: 'lightbulb',
      year: '2024',
      title: 'Sostenibilidad y energías renovables',
      description: 'Liderazgo en soluciones sostenibles, con un enfoque en proyectos de energía renovable.',
      image: '\..\assets\img-generales\edificio.jpg'
    }
  ];

  prevSlide() {
    if (this.currentPosition < 0) {
      this.currentPosition += this.itemWidth;
    }
  }

  nextSlide() {
    if (this.currentPosition > -(this.itemWidth * (this.timelineData.length - 1))) {
      this.currentPosition -= this.itemWidth;
    }
  }

  cards = [
    {
      icon: 'engineering',
      title: 'Calidad',
      content: 'Nos comprometemos a entregar soluciones eléctricas con altos estándares de calidad, asegurando la confiabilidad y eficiencia en cada proyecto.',
    },
    {
      icon: 'support_agent',
      title: 'Atención Personalizada',
      content: 'Ofrecemos un servicio de atención al cliente especializado, orientado a cubrir todas tus necesidades, garantizando soporte en cada etapa del proyecto.',
    },
    {
      icon: 'bolt',
      title: 'Innovación',
      content: 'Nos mantenemos a la vanguardia tecnológica, implementando soluciones innovadoras y eficientes para mejorar el rendimiento energético de nuestros clientes.',
    }
  ];


  services = [
    { title: 'Asesoría', description: 'Ofrecemos un servicio de asesoría personalizada para ayudarte a elegir el instrumento musical que mejor se adapte a tus necesidades.' },
    { title: 'Reparación', description: 'Proporcionamos servicios completos de reparación y mantenimiento para todos los tipos de instrumentos musicales.' },
    { title: 'Clases', description: 'Ofrecemos clases de música para una variedad de instrumentos, incluyendo guitarra, piano, batería, y muchos más.' },
    { title: 'Venta', description: 'Disponemos de una amplia gama de accesorios y equipos de sonido para complementar tu instrumento musical de cualquier marca.' },
  ];

  activeIndex = 0;

  nextService() {
    this.activeIndex = (this.activeIndex + 1) % this.servicios.length;
  }

  prevService() {
    this.activeIndex = (this.activeIndex - 1 + this.servicios.length) % this.servicios.length;
  }






}

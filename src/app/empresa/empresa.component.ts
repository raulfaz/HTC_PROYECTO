import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import {MatStepperModule} from '@angular/material/stepper';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { SERVICIOS } from '../datos/servicios';

@Component({
  selector: 'app-empresa',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatGridListModule, MatTabsModule, MatStepperModule],
  templateUrl: './empresa.component.html',
  styleUrl: './empresa.component.css'
})
export class EmpresaComponent {

  servicios = SERVICIOS

  currentPosition = 0;
  itemWidth = 400; // Nuevo ancho ajustado de la tarjeta

  isLinear = false;
  isMobile = false;

  timelineData = [
    {
      icon: 'business',
      year: '2015',
      title: 'Fundación de la empresa',
      description: 'Inicio de operaciones con un equipo profesional enfocado en soluciones eléctricas eficientes.'
    },
    {
      icon: 'public',
      year: '2018',
      title: 'Expansión internacional',
      description: 'Nos expandimos hacia nuevos mercados en Latinoamérica, con oficinas en varios países.'
    },
    {
      icon: 'bolt',
      year: '2020',
      title: 'Innovación y nuevas tecnologías',
      description: 'Introducción de nuevas tecnologías en nuestros servicios, apostando por la innovación.'
    },
    {
      icon: 'engineering',
      year: '2022',
      title: 'Crecimiento del equipo',
      description: 'El equipo de la empresa creció con la incorporación de nuevos especialistas en diversas áreas.'
    },
    {
      icon: 'lightbulb',
      year: '2024',
      title: 'Sostenibilidad y energías renovables',
      description: 'Liderazgo en soluciones sostenibles, con un enfoque en proyectos de energía renovable.'
    }
  ];

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isMobile = result.matches;
    });
  }

  // Al hacer clic en el botón izquierdo
  prevSlide() {
    if (this.currentPosition === 0) {
      this.currentPosition = -(this.itemWidth * (this.timelineData.length - 1)); // Vuelve al último
    } else {
      this.currentPosition += this.itemWidth;
    }
  }

  // Al hacer clic en el botón derecho
  nextSlide() {
    if (this.currentPosition <= -(this.itemWidth * (this.timelineData.length - 1))) {
      this.currentPosition = 0; // Vuelve al primero
    } else {
      this.currentPosition -= this.itemWidth;
    }
  }



  // cards con las áreas y explicaciones para SOPORTE TÉCNICO
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



  // Array 'services' actualizado con las áreas de SOPORTE TÉCNICO
  services = [
    {
      title: 'Soporte Eléctrico',
      description: 'Brindamos asistencia técnica especializada para resolver problemas eléctricos, asegurando un servicio rápido y eficiente para mantener tus instalaciones en óptimas condiciones.'
    },
    {
      title: 'Atención Personalizada',
      description: 'Ofrecemos un servicio de atención personalizada para garantizar que todas tus consultas y problemas técnicos sean resueltos a la mayor brevedad posible.'
    },
    {
      title: 'Mantenimiento Preventivo',
      description: 'Realizamos mantenimiento preventivo en tus sistemas eléctricos, con el fin de evitar fallos y asegurar un rendimiento continuo y seguro de tu infraestructura.'
    },
    {
      title: 'Innovación y Actualización',
      description: 'Nos mantenemos actualizados con las últimas tecnologías, implementando soluciones innovadoras y eficientes para mejorar la capacidad de tu sistema eléctrico.'
    }
  ];


  activeIndex = 0;

  nextService() {
    this.activeIndex = (this.activeIndex + 1) % this.servicios.length;
  }

  prevService() {
    this.activeIndex = (this.activeIndex - 1 + this.servicios.length) % this.servicios.length;
  }






}
